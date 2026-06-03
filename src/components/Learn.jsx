import { useState, useRef } from "react";
import Card from "./Card.jsx";
import Button from "./Button.jsx";
import BottomBar from "./BottomBar.jsx";
import { useKeyboard } from "../hooks/use-keyboard.js";
import { State } from "ts-fsrs";
import LearnMoreDropdown from "./LearnMoreDropdown.jsx";

let logCard = (card, prevState, nextState, due) => {
  let states = {
    [State.New]: "New",
    [State.Learning]: "Learning",
    [State.Review]: "Review",
    [State.Relearning]: "Relearning",
  }
  console.log(`Card: ${card.romaji}
    Prev State ${states[prevState]}
    Next State ${states[nextState]}
    Due ${due}
  `)
}

export default function Learn({ newCardsProp, reviewCardsProp, learningCardsProp, onCardDataUpdate, onLearnFinish }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [newCards, setNewCards] = useState(() => {
    return [...newCardsProp];
  });
  const [learnCards, setLearnCards] = useState(() => {
    return [...learningCardsProp].map((i) => ({card: i}))
  });
  const [reviewCards, setReviewCards] = useState(() => {
    return [...reviewCardsProp]
  });
  const [card, setCard] = useState(() => {
    if (newCardsProp.length > 0) {
      return newCardsProp[0];
    }
    if (learningCardsProp.length > 0) {
      return learningCardsProp[0];
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

  function getNextCard(newCards, learnCards, reviewCards) {
    let dueCard = learnCards.find((c) => {
      let now = new Date()
      // now.setMinutes(now.getMinutes() + 9, now.getSeconds() + 50);
      return c.due < now;
    })
    if (dueCard) {
      return dueCard.card
    }

    if (newCards.length) {
      return newCards[0];
    }

    if (learnCards.length) {
      return learnCards[0].card;
    }

    if (reviewCards.length) {
      return reviewCards[0];
    }

    return null
  }

  function handleReviewedClick(rating) {
    let [updatedCardData, prevState] = onCardDataUpdate(card.id, "reviewed", rating);

    let nextNewCards = prevState === State.New ? newCards.slice(1) : newCards
    let nextLearnCards = prevState === State.Learning ? learnCards.filter((c) => c.card.id !== card.id) : learnCards
    let nextReviewCards = prevState === State.Review ? reviewCards.slice(1) : reviewCards

    if (updatedCardData.state === State.Learning) {
      nextLearnCards.push({ card, due: updatedCardData.due });
    }

    logCard(card, prevState, updatedCardData.state, updatedCardData.due)

    setNewCards(nextNewCards)
    setLearnCards(nextLearnCards)
    setReviewCards(nextReviewCards)
    setShowAnswer(false);

    let nextCard = getNextCard(nextNewCards, nextLearnCards, nextReviewCards)

    if (nextCard) {
      setCard(nextCard)
    } else {
      onLearnFinish()
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
          <LearnMoreDropdown>
            <Button className="bg-lime-300 hover:bg-lime-200">More</Button>
          </LearnMoreDropdown>
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
