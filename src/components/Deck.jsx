import { useContext, useState } from "react";
import BottomBar from "./BottomBar.jsx";
import Button from "./Button.jsx";
import { OptionsContext } from "../options-context.js";
import clsx from "clsx";

export default function Deck({ deck, deckSrsData }) {
  const options = useContext(OptionsContext);

  const [selectedItems, setSelectedItems] = useState(new Set());

  function getCardDue(id) {
    let due = deckSrsData.current[id]?.due;
    return due ? new Date(due).toISOString().substring(0, 10) : null;
  }

  function handleItemClick(id) {
    const selection = window.getSelection().toString();
    if (selection.length > 0) return;

    setSelectedItems((prev) => {
      let next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <>
      <div className="text-xl font-semibold mb-4">{deck.name}</div>
      <div className="w-full rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-600 dark:bg-gray-700">
        <table className="w-full text-lg">
          <thead className="font-semibold">
            <tr className="*:p-2 border-b border-gray-300 dark:border-gray-500">
              <td>Word</td>
              <td>Sentence</td>
              <td>Translation</td>
              <td>Due</td>
            </tr>
          </thead>
          <tbody>
            {deck.cards.map((card) => {
              return (
                <tr
                  key={card.id}
                  onClick={() => handleItemClick(card.id)}
                  className={clsx(
                    "*:p-2 border-t border-gray-300 dark:border-gray-500",
                    { "bg-neutral-100 dark:bg-gray-600": selectedItems.has(card.id) }
                  )}
                >
                  <td>{card.word}</td>
                  <td>{card.example_sentence}</td>
                  <td>{card.translation}</td>
                  <td>{getCardDue(card.id) || <Badge variant="success">New</Badge>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <BottomBar className="p-4">
        <div className="flex-1 gap-x-4">
          <Button className="bg-green-300 hover:bg-green-200">Add card</Button>
        </div>
        <div className="flex gap-x-4">
        {!!selectedItems.size && 
          <>
            <Button className="bg-yellow-300 hover:bg-yellow-200">Suspend</Button>
            <Button className="bg-yellow-300 hover:bg-yellow-200">Reset</Button>
            <Button className="bg-red-300 hover:bg-red-200">Delete</Button>
          </>
        }
        </div>
        <div className="flex flex-1 gap-x-4 justify-end">
          <Button className="bg-green-300 hover:bg-green-200">More</Button>
        </div>
      </BottomBar>
    </>
  );
}

function Badge({ children, variant }) {
  return (
    <span
      className={clsx(
        "rounded-md px-2 py-1 text-sm font-semibold dark:text-gray-800",
        { "bg-green-200 dark:bg-green-300": variant === "success" }
      )}
    >
      {children}
    </span>
  );
}
