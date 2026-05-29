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
import { motion } from "motion/react";
import { createEmptyCard, fsrs, Rating } from "ts-fsrs";

const defaultOptions = {
  newCards: 5,
  reviewCards: 100,
  showRomaji: true,
  showJisho: true,
};

const defaultDeck = {
  name: "Default deck",
  cards: [
    {
      id: 1,
      word: "平和",
      romaji: "heiwa",
      translation: "Peace",
      example_sentence: "世界が平和であることを願っています。",
    },
    {
      id: 2,
      word: "信じる",
      romaji: "shinjiru",
      translation: "To believe",
      example_sentence: "自分自身の力を信じてください。",
    },
    {
      id: 3,
      word: "情熱",
      romaji: "jounetsu",
      translation: "Passion",
      example_sentence: "彼は仕事に対して強い情熱を持っています。",
    },
    {
      id: 4,
      word: "公園",
      romaji: "kouen",
      translation: "Park",
      example_sentence: "天気がいいので公園を散歩しましょう。",
    },
    {
      id: 5,
      word: "忙しい",
      romaji: "isogashii",
      translation: "Busy",
      example_sentence: "今日は仕事がとても忙しいです。",
    },
    {
      id: 6,
      word: "伝統",
      romaji: "dentou",
      translation: "Tradition",
      example_sentence: "古い伝統を守ることは大切です。",
    },
    {
      id: 7,
      word: "踊る",
      romaji: "odoru",
      translation: "To dance",
      example_sentence: "彼女はステージで美しく踊りました。",
    },
    {
      id: 8,
      word: "大切",
      romaji: "taisetsu",
      translation: "Important / Precious",
      example_sentence: "これは祖母からもらった大切な指輪です。",
    },
    {
      id: 9,
      word: "窓",
      romaji: "mado",
      translation: "Window",
      example_sentence: "窓から富士山が見えます。",
    },
    {
      id: 10,
      word: "記念日",
      romaji: "kinenbi",
      translation: "Anniversary",
      example_sentence: "今日は私たちの結婚記念日です。",
    },
  ],
};

const defaultCardData = {
  reviewed: 0,
  due: null,
  suspended: false,
  fsrs: createEmptyCard(),
};

let today = ""
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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const scheduler = useRef(fsrs());

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
      new Date(today ? today : Date.now()),
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
      new Date(today ? today : Date.now()),
      Rating[details],
      ({ card, log }) => ({
        card: {
          ...card,
          due: card.due.getTime(),
          last_review: card.last_review?.getTime() ?? null,
        },
        log: {
          ...log,
          due: log.due.getTime(),
          review: log.review.getTime(),
        },
      }),
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
  }

  function handleClickDeck() {
    setPage("deck");
  }

  function handleSuspendCards(cardsId) {
    let ids = [...cardsId]
    ids.forEach((id) => {
      let cardData = getCardData(id)
      cardData.suspended = true
    })
    localStorage.setItem("deckSrsData", JSON.stringify(deckSrsData.current));
  }

  return (
    <>
      <Navbar onClickDarkMode={handleClickDarkMode} setPage={setPage} darkMode={darkMode}></Navbar>

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
                deckSrsData={deckSrsData}
                onCardDataUpdate={handleCardDataUpdate}
                setModalOpen={setModalOpen}
                setModalData={setModalData}
                onSuspend={handleSuspendCards}
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
        </OptionsContext>
        <Modal open={modalOpen} setOpen={setModalOpen} {...modalData}></Modal>

        {debug && (
          <div className="fixed left-0 top-20 flex flex-col">
            {new Date(today ? today : Date.now()).toISOString()}
            <button onClick={() => localStorage.removeItem("deckSrsData")}>delete deck data</button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
