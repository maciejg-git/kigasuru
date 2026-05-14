import { useState, useRef, useEffect } from "react";
import Learn from "./components/Learn";
import Home from "./components/Home";
import Deck from "./components/Deck";
import Options from "./components/Options";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import "./App.css";
import { calculateLearnCards, getCardDue } from "./srs";
import { OptionsContext } from "./options-context";
import { motion } from "motion/react";

const defaultOptions = {
  newCards: 5,
  reviewCards: 100,
  showRomaji: true,
  showJisho: true,
};

const defaultDeck = {
  name: "Default deck",
  cards: [],
};

const defaultCardData = {
  reviewed: 0,
  due: null,
  suspended: false,
};

function App() {
  const [options, setOptions] = useState(defaultOptions);
  const [page, setPage] = useState("home");
  const [learnCards, setLearnCards] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [deck, setDeck] = useState(() => {
    return JSON.parse(localStorage.getItem("deck")) || defaultDeck;
  });
  let currentSrsData = useRef([]);
  let deckSrsData = useRef(
    JSON.parse(localStorage.getItem("deckSrsData")) || {}
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  useEffect(() => {
    localStorage.setItem("deck", JSON.stringify(deck));
  }, [deck]);

  function handleClickDarkMode() {
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setDarkMode(() => !darkMode);
  }

  function handleClickStart() {
    let cards = calculateLearnCards(
      deck.cards,
      deckSrsData.current,
      today,
      options.newCards
    );
    if (!cards.length) {
      return;
    }
    setLearnCards(cards);
    setPage("learn");
  }

  function handleCardDataUpdate(cardId, action, details) {
    let cardData = deckSrsData.current[cardId] || {
      ...defaultCardData,
    };

    if (action === "reviewed") {
      cardData.reviewed++;
      cardData.due = getCardDue(cardData, today, details).getTime();
    }

    currentSrsData.current[cardId] = cardData;
  }

  function handleLearnFinished() {
    deckSrsData.current = { ...deckSrsData.current, ...currentSrsData.current };
    setPage("home");
    localStorage.setItem("deckSrsData", JSON.stringify(deckSrsData.current));
  }

  function handleClickDeck() {
    setPage("deck");
  }

  return (
    <>
      <Navbar
        onClickDarkMode={handleClickDarkMode}
        setPage={setPage}
        darkMode={darkMode}
      ></Navbar>

      <div className="mx-auto h-screen max-w-5xl pt-20">
        <OptionsContext value={options}>
          {page === "home" && (
            <motion.div
              className="content h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Home
                onClickStart={handleClickStart}
                onClickDeck={handleClickDeck}
                data={deck}
                deckSrsData={deckSrsData}
              ></Home>
            </motion.div>
          )}
          {page === "learn" && (
            <motion.div
              className="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Learn
                cards={learnCards}
                onCardDataUpdate={handleCardDataUpdate}
                onLearnFinish={handleLearnFinished}
              ></Learn>
            </motion.div>
          )}
          {page === "deck" && (
            <motion.div
              className="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Deck
                deck={deck}
                deckSrsData={deckSrsData}
                onCardDataUpdate={handleCardDataUpdate}
                setModalOpen={setModalOpen}
                setModalData={setModalData}
              ></Deck>
            </motion.div>
          )}
          {page === "options" && (
            <motion.div
              className="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Options options={options} setOptions={setOptions}></Options>
            </motion.div>
          )}
        </OptionsContext>
        <Modal open={modalOpen} setOpen={setModalOpen} {...modalData}></Modal>
      </div>
    </>
  );
}

export default App;
