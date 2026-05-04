import { useState, useRef, useEffect } from "react";
import Learn from "./components/Learn";
import Home from "./components/Home";
import Modal from "./components/Modal";
import data from "./data/data.json";
import "./App.css";

function calculateLearnCards(cardsData, newCardsLimit) {
  let newCards = data
    .filter((card) => {
      return !cardsData[card.id]
    })
    .splice(0, newCardsLimit);

  return newCards;
}

function App() {
  const [options, setOptions] = useState({ newCards: 5 });
  const [currentPage, setCurrentPage] = useState("home");
  const [learnCards, setLearnCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  let learnCardsData = useRef([]);
  let cardsData = useRef(JSON.parse(localStorage.getItem("cardsData")) || {})

  function handleClickStart() {
    let cards = calculateLearnCards(cardsData.current, options.newCards);
    setLearnCards(cards);
    setCurrentPage("learn");
  }

  function handleCardDataUpdate(card, action) {
    if (!cardsData.current[card.id]) {
      learnCardsData.current[card.id] = {...card, repeated: 0}
    } else {
      learnCardsData.current[card.id] = {...cardsData.current[card.id]}
    }

    if (action === "repeated") {
      learnCardsData.current[card.id].repeated++;
    }
  }

  function handleLearnFinished() {
    let newCardsData = {...cardsData.current, ...learnCardsData.current}
    // localStorage.setItem("cardsData", JSON.stringify(newCardsData))
  }

  return (
    <>
      <div className="mx-auto h-screen max-w-4xl">
        {currentPage === "home" && (
          <Home onClickStart={handleClickStart} data={data} cardsData={cardsData}></Home>
        )}
        {currentPage === "learn" && (
          <Learn
            cards={learnCards}
            onCardDataUpdate={handleCardDataUpdate}
            onLearnFinish={handleLearnFinished}
          ></Learn>
        )}
      </div>
      {isModalOpen && <Modal></Modal>}
    </>
  );
}

export default App;
