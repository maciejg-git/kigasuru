import { useState } from "react";
import Card from "./Card.jsx";
import Button from "./Button.jsx";
import BArrowCounterclockwise from "../icons/BArrowCounterclockwise.jsx";
import { useKeyboard } from "../hooks/use-keyboard.js";
import { motion } from "motion/react";

export default function Learn({ cards, onCardDataUpdate, onLearnFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardSequence, setCardSequence] = useState(() =>
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

  let card = cards[cardSequence[currentIndex]];

  function handleGoodClick() {
    onCardDataUpdate(card, "repeated");
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
    setCardSequence(() => [...cardSequence, cardSequence[currentIndex]]);
    setCurrentIndex((currentIndex) => currentIndex + 1);
    setShowAnswer(() => false);
  }

  function handleKeyboard(key) {
    if (key === "space") {
      if (showAnswer) {
        handleGoodClick();
        return;
      }
      handleShowAnswerClick();
      return;
    }
    if (key === "a") {
      handleAgainClick();
    }
  }

  return (
    <>
      <motion.div
        className="flex h-full flex-col py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Card currentExample={card} showAnswer={showAnswer}></Card>
        <div className="mt-auto flex">
          <div className="flex-1"></div>
          <div className="flex gap-x-4">
            {!showAnswer && (
              <Button
                onClick={handleShowAnswerClick}
                className="bg-green-400 hover:bg-green-300"
              >
                Show answer
              </Button>
            )}
            {showAnswer && (
              <Button
                onClick={handleGoodClick}
                className="bg-green-400 hover:bg-green-300"
              >
                Good
              </Button>
            )}
            {showAnswer && (
              <Button
                onClick={handleAgainClick}
                className="bg-yellow-400 hover:bg-yellow-300"
              >
                Again
              </Button>
            )}
          </div>
          <div className="flex-1 flex justify-end">
            <Button className="bg-green-400 hover:bg-green-300">More</Button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
