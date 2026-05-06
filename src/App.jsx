import { useState, useRef, useEffect } from "react";
import Learn from "./components/Learn";
import Home from "./components/Home";
import Deck from "./components/Deck";
import Options from "./components/Options";
import Button from "./components/Button";
import data from "./data/data.json";
import "./App.css";
import { calculateLearnCards, getCardDue } from "./srs";
import { OptionsContext } from "./options-context";

function App() {
  const [options, setOptions] = useState({ newCards: 5 });
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
      setPage("home")
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
      <div className="flex px-4 py-2 items-center justify-between">
        <span className="text-2xl font-semibold">Japan</span>
        <button onClick={handleClickOptions} className="font-semibold">Options</button>
      </div>
      <div className="mx-auto h-screen max-w-4xl">
        <OptionsContext value={options}>
          {page === "home" && (
            <Home
              onClickStart={handleClickStart}
              onClickDeck={handleClickDeck}
              data={data}
              deckSrsData={deckSrsData}
            ></Home>
          )}
          {page === "learn" && (
            <Learn
              cards={learnCards}
              onCardDataUpdate={handleCardDataUpdate}
              onLearnFinish={handleLearnFinished}
            ></Learn>
          )}
          {page === "deck" && <Deck deck={data}></Deck>}
          {page === "options" && <Options options={options} setOptions={setOptions}></Options>}
        </OptionsContext>
      </div>
    </>
  );
}

export default App;
