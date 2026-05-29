import { useState, useRef } from "react";
import Card from "./Card.jsx";
import Button from "./Button.jsx";
import BottomBar from "./BottomBar.jsx";
import { useKeyboard } from "../hooks/use-keyboard.js";
import { State } from "ts-fsrs";

export default function Learn({ newCardsProp, reviewCardsProp, onCardDataUpdate, onLearnFinish }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [learnCards, setLearnCards] = useState([]);
  const [newCards, setNewCards] = useState(() => {
    if (newCardsProp.length > 0) {
      return [...newCardsProp].slice(1);
    }
    return [...newCardsProp];
  });
  const [reviewCards, setReviewCards] = useState(() => {
    if (newCardsProp.length > 0) {
      return [...reviewCardsProp];
    }
    return [...reviewCardsProp].slice(1);
  });
  const [card, setCard] = useState(() => {
    if (newCardsProp.length > 0) {
      return newCardsProp[0];
    }
    return reviewCardsProp[0];
  });

  useKeyboard({
    key: " ",
    onKeyPressed: () => handleKeyboard("space"),
  });
  useKeyboard({
    key: "a",
    onKeyPressed: () => handleKeyboard("a"),
  });
  useKeyboard({
    key: "1",
    onKeyPressed: () => handleKeyboard("1"),
  });

  function handleReviewedClick(rating) {
    let updatedCardData = onCardDataUpdate(card.id, "reviewed", rating);
    console.log(new Date(updatedCardData.due));

    let nextLearnCards = [...learnCards];
    let nextNewCards = [...newCards];
    let nextReviewCards = [...reviewCards];

    if (updatedCardData.state === State.Learning) {
      nextLearnCards.push({ card, due: updatedCardData.due });
      setLearnCards(nextLearnCards);
    }

    if (nextLearnCards.length) {
      let foundCard =
        nextLearnCards.find((c) => {
          return c.due < new Date().getTime();
        }) ||
        (nextNewCards.length === 0 && nextLearnCards[0]);

      if (foundCard) {
        setCard(foundCard.card);
        nextLearnCards = nextLearnCards.filter((c) => c !== foundCard);
        setLearnCards(nextLearnCards);

        setShowAnswer(false);
        return;
      }
    }

    if (nextNewCards.length) {
      setCard(nextNewCards[0]);
      setNewCards(nextNewCards.slice(1));
      setShowAnswer(false);
      return;
    }

    if (nextReviewCards.length) {
      setCard(nextReviewCards[0]);
      setReviewCards(nextReviewCards.slice(1));
      setShowAnswer(false);
      return;
    }

    if (!nextNewCards.length && !nextLearnCards.length && !nextReviewCards.length) {
      onLearnFinish();
    }
  }

  function handleShowAnswerClick() {
    setShowAnswer(() => true);
  }

  function handleKeyboard(key) {
    if (key === "space") {
      if (showAnswer) {
        handleReviewedClick("Good");
        return;
      }
      handleShowAnswerClick();
      return;
    }
    if (key === "a") {
      if (showAnswer) {
        handleReviewedClick("Again");
        return;
      }
    }
    if (key === "1") {
      if (showAnswer) {
        handleReviewedClick("easy");
        return;
      }
    }
  }

  return (
    <>
      <Card currentExample={card} showAnswer={showAnswer}></Card>
      <BottomBar className="p-4">
        <div className="flex-1">
          <LearnStats
            newCards={newCards}
            learnCards={learnCards}
            reviewCards={reviewCards}
          ></LearnStats>
        </div>
        <div className="flex gap-x-4">
          {!showAnswer && (
            <Button onClick={handleShowAnswerClick} className="bg-lime-300 hover:bg-lime-200">
              Show answer
            </Button>
          )}
          {showAnswer && (
            <>
              <Button
                onClick={() => handleReviewedClick("Easy")}
                className="bg-lime-300 hover:bg-lime-200"
              >
                Easy
              </Button>
              <Button
                onClick={() => handleReviewedClick("Good")}
                className="bg-lime-300 hover:bg-lime-200"
              >
                Good
              </Button>
              <Button
                onClick={() => handleReviewedClick("Hard")}
                className="bg-lime-300 hover:bg-lime-200"
              >
                Hard
              </Button>
            </>
          )}
          {showAnswer && (
            <Button
              onClick={() => handleReviewedClick("Again")}
              className="bg-yellow-300 hover:bg-yellow-200"
            >
              Again
            </Button>
          )}
        </div>
        <div className="flex flex-1 justify-end">
          <Button className="bg-lime-300 hover:bg-lime-200">More</Button>
        </div>
      </BottomBar>
    </>
  );
}

function LearnStats({ newCards, learnCards, reviewCards }) {
  return (
    <div className="flex gap-x-6 font-semibold">
      <div className="flex gap-x-2">
        New
        <span className="text-green-600">{newCards.length}</span>
      </div>
      <div className="flex gap-x-2">
        Learning
        <span className="text-red-500">{learnCards.length}</span>
      </div>
      <div className="flex gap-x-2">
        Reviews
        <span className="text-yellow-500">{reviewCards.length}</span>
      </div>
    </div>
  );
}
