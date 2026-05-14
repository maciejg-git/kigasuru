import { useState } from "react";
import Card from "./Card.jsx";
import Button from "./Button.jsx";
import BottomBar from "./BottomBar.jsx";
import { useKeyboard } from "../hooks/use-keyboard.js";
import { useImmer } from "use-immer";

export default function Learn({ cards, onCardDataUpdate, onLearnFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardSequence, setCardSequence] = useImmer(() =>
    cards.map((card, index) => index)
  );
  const [showAnswer, setShowAnswer] = useState(false);

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

  let card = cards[cardSequence[currentIndex]];

  function handleReviewedClick(rating) {
    onCardDataUpdate(card.id, "reviewed", rating);
    if (currentIndex < cardSequence.length - 1) {
      setCurrentIndex((currentIndex) => currentIndex + 1);
    } else {
      onLearnFinish();
      return;
    }
    setShowAnswer(() => false);
  }

  function handleShowAnswerClick() {
    setShowAnswer(() => true);
  }

  function handleAgainClick() {
    setCardSequence((draft) => {
      draft.push(cardSequence[currentIndex]);
    });
    setCurrentIndex((currentIndex) => currentIndex + 1);
    setShowAnswer(() => false);
  }

  function handleKeyboard(key) {
    if (key === "space") {
      if (showAnswer) {
        handleReviewedClick("good");
        return;
      }
      handleShowAnswerClick();
      return;
    }
    if (key === "a") {
      handleAgainClick();
      return
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
        <div className="flex-1"></div>
        <div className="flex gap-x-4">
          {!showAnswer && (
            <Button
              onClick={handleShowAnswerClick}
              className="bg-lime-300 hover:bg-lime-200"
            >
              Show answer
            </Button>
          )}
          {showAnswer && (
            <>
              <Button
                onClick={() => handleReviewedClick("easy")}
                className="bg-lime-300 hover:bg-lime-200"
              >
                Easy
              </Button>
              <Button
                onClick={() => handleReviewedClick("good")}
                className="bg-lime-300 hover:bg-lime-200"
              >
                Good
              </Button>
              <Button
                onClick={() => handleReviewedClick("hard")}
                className="bg-lime-300 hover:bg-lime-200"
              >
                Hard
              </Button>
            </>
          )}
          {showAnswer && (
            <Button
              onClick={handleAgainClick}
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
