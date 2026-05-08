import { useState, useRef, useEffect } from "react";
import Learn from "./components/Learn";
import Home from "./components/Home";
import Deck from "./components/Deck";
import Options from "./components/Options";
import Navbar from "./components/Navbar";
import data from "./data/data.json";
import "./App.css";
import { calculateLearnCards, getCardDue } from "./srs";
import { OptionsContext } from "./options-context";
import { motion } from "motion/react";

function App() {
  const [options, setOptions] = useState({ newCards: 5, romaji: true });
  const [page, setPage] = useState("home");
  const [learnCards, setLearnCards] = useState([]);
  let currentSrsData = useRef([]);
  let deckSrsData = useRef(
    JSON.parse(localStorage.getItem("deckSrsData")) || {}
  );
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  function handleClickStart() {
    let cards = calculateLearnCards(
      data,
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

  function handleClickOptions() {
    if (page === "home") {
      setPage("options");
    } else {
      setPage("home");
    }
  }

  function handleCardDataUpdate(card, action) {
    if (!deckSrsData.current[card.id]) {
      currentSrsData.current[card.id] = { ...card, reviewed: 0, due: null };
    } else {
      currentSrsData.current[card.id] = { ...deckSrsData.current[card.id] };
    }

    if (action === "reviewed") {
      currentSrsData.current[card.id].reviewed++;
      currentSrsData.current[card.id].due = getCardDue(
        currentSrsData.current[card.id],
        today
      ).getTime();
    }
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
        onClickOptions={handleClickOptions}
        onClickDeck={handleClickDeck}
      ></Navbar>
      <div className="mx-auto h-screen max-w-4xl pt-20">
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
                data={data}
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
              <Deck deck={data}></Deck>
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
      </div>
    </>
  );
}

export default App;
