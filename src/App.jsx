import { useState, useRef, useEffect } from "react";
import Learn from "./components/Learn";
import Home from "./components/Home";
import Deck from "./components/Deck";
import Options from "./components/Options";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import CardEdit from "./components/CardEdit.jsx"
import "./App.css";
import { calculateLearnCards } from "./srs";
import { OptionsContext } from "./options-context";
import { DateContext } from "./date-context";
import { motion } from "motion/react";
import { createEmptyCard, fsrs, Rating } from "ts-fsrs";
import data500 from "./data/data500.json"

const defaultOptions = {
  newCards: 5,
  reviewCards: 100,
  showRomaji: true,
  showJisho: true,
};

const defaultDeck = {
  name: "Default deck",
  cards: data500,
};

const defaultCardData = {
  reviewed: 0,
  due: null,
  suspended: false,
  fsrs: createEmptyCard(),
};

let debug = false;

function App() {
  const [options, setOptions] = useState(defaultOptions);
  const [page, setPage] = useState("home");
  const [newCards, setNewCards] = useState([]);
  const [reviewCards, setReviewCards] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [deck, setDeck] = useState(() => {
    return JSON.parse(localStorage.getItem("deck")) || defaultDeck;
  });
  let currentSrsData = useRef([]);
  let deckSrsData = useRef(JSON.parse(localStorage.getItem("deckSrsData")) || {});
  let lastLearn = useRef(JSON.parse(localStorage.getItem("deckSrsData")) || null)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const scheduler = useRef(fsrs());
  const [, forceUpdate] = useState(0);
  const [today, setToday] = useState(new Date())

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

  function getCardData(cardId) {
    let cardData = currentSrsData.current[cardId] ||
      deckSrsData.current[cardId]
    if (!cardData) {
      cardData = {...defaultCardData}
      deckSrsData.current[cardId] = cardData
    }
    return cardData
  }

  function handleClickStart() {
    let [newCards, reviewCards] = calculateLearnCards(
      deck.cards,
      deckSrsData.current,
      today,
      options.newCards,
    );
    if (!newCards.length && !reviewCards.length) {
      return;
    }
    setNewCards(newCards);
    setReviewCards(reviewCards);
    setPage("learn");
  }

  function handleCardDataUpdate(cardId, action, details) {
    let cardData = getCardData(cardId)

    const { card, log } = scheduler.current.next(
      cardData.fsrs,
      today,
      Rating[details]
    );
    cardData.fsrs = { ...card };

    currentSrsData.current[cardId] = cardData;

    return card;
  }

  function handleLearnFinished() {
    deckSrsData.current = { ...deckSrsData.current, ...currentSrsData.current };
    currentSrsData.current = [];
    setPage("home");
    localStorage.setItem("deckSrsData", JSON.stringify(deckSrsData.current));
    lastLearn.current = today
    localStorage.setItem("lastLearn", lastLearn.current.toISOString());
  }

  function handleClickDeck() {
    setPage("deck");
  }

  function handleSuspendCards(cardId) {
    let cardData = getCardData(cardId)
    cardData.suspended = !cardData.suspended
    localStorage.setItem("deckSrsData", JSON.stringify(deckSrsData.current));
    forceUpdate((t) => t + 1);
  }

  function handleResetCards(cardsId) {
    let ids = [...cardsId]
    ids.forEach((id) => {
      let cardData = {...defaultCardData}
      deckSrsData.current[id] = cardData;
    })
    localStorage.setItem("deckSrsData", JSON.stringify(deckSrsData.current));
    forceUpdate((t) => t + 1);
  }

  return (
    <>
      <Navbar onClickDarkMode={handleClickDarkMode} setPage={setPage} darkMode={darkMode}></Navbar>

      <div className="mx-auto h-screen max-w-6xl pt-20">
        <OptionsContext value={options}>
          <DateContext value={today}>
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
              <motion.div className="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Learn
                  newCardsProp={newCards}
                  reviewCardsProp={reviewCards}
                  onCardDataUpdate={handleCardDataUpdate}
                  onLearnFinish={handleLearnFinished}
                ></Learn>
              </motion.div>
            )}
            {page === "deck" && (
              <motion.div className="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Deck
                  deck={deck}
                  deckSrsData={{...deckSrsData}}
                  onCardDataUpdate={handleCardDataUpdate}
                  setModalOpen={setModalOpen}
                  setModalData={setModalData}
                  onSuspend={handleSuspendCards}
                  onReset={handleResetCards}
                ></Deck>
              </motion.div>
            )}
            {page === "edit" && (
              <CardEdit></CardEdit>
            )}
            {page === "options" && (
              <motion.div className="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Options options={options} setOptions={setOptions}></Options>
              </motion.div>
            )}
          </DateContext>
        </OptionsContext>
        <Modal open={modalOpen} setOpen={setModalOpen} {...modalData}></Modal>

        {debug && (
          <div className="fixed left-0 top-20 flex flex-col">
            <button onClick={() => localStorage.removeItem("deckSrsData")}>delete deck data</button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
