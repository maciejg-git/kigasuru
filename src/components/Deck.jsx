import { useContext, useState } from "react";
import BottomBar from "./BottomBar.jsx";
import Button from "./Button.jsx";
import { OptionsContext } from "../options-context.js";
import clsx from "clsx";

export default function Deck({
  deck,
  deckSrsData,
  setModalOpen,
  setModalData,
}) {
  const options = useContext(OptionsContext);

  const [selectedItems, setSelectedItems] = useState(new Set());

  function getCardDue(id) {
    let due = deckSrsData.current[id]?.due;
    return due ? new Date(due).toISOString().substring(0, 10) : null;
  }

  function handleItemClick(e, id) {
    const selection = window.getSelection().toString();
    if (selection.length > 0) return;

    if (e.ctrlKey) {
      setSelectedItems((prev) => {
        let next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });

      return
    }
    setSelectedItems((prev) => {
      let next = new Set();
      if (prev.has(id) && prev.size === 1) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function handleSuspendClick() {
    setModalData({
      title: "Suspend cards",
      message: `Suspend ${selectedItems.size} cards`,
      labelAccept: "OK",
      labelCancel: "Cancel",
    });
    setModalOpen(true);
  }

  function handleResetClick() {
    setModalData({
      title: "Reset cards",
      message: `Reset ${selectedItems.size} cards`,
      labelAccept: "OK",
      labelCancel: "Cancel",
    });
    setModalOpen(true);
  }

  return (
    <>
      <div className="mb-4 text-xl font-semibold">{deck.name}</div>

      <div className="w-full rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-600 dark:bg-gray-800">
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
                  onClick={(e) => handleItemClick(e, card.id)}
                  className={clsx(
                    "*:p-2 border-t border-gray-300 dark:border-gray-600",
                    {
                      "bg-neutral-100 dark:bg-gray-700": selectedItems.has(
                        card.id
                      ),
                    }
                  )}
                >
                  <td>{card.word}</td>
                  <td className="text-sm">{card.example_sentence}</td>
                  <td>{card.translation}</td>
                  <td>
                    {getCardDue(card.id) || (
                      <Badge variant="success">New</Badge>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <BottomBar className="p-4">
        <div className="flex flex-1 gap-x-4">
          <Button className="bg-lime-300 hover:bg-lime-200">Add card</Button>
          {selectedItems.size === 1 && <Button
            className="bg-lime-300 hover:bg-lime-200"
            onClick={handleSuspendClick}
          >
            Edit card
          </Button>}
        </div>
        <div className="flex gap-x-4">
          {!!selectedItems.size && (
            <>
              <Button
                className="bg-yellow-300 hover:bg-yellow-200"
                onClick={handleSuspendClick}
              >
                Suspend
              </Button>
              <Button
                className="bg-yellow-300 hover:bg-yellow-200"
                onClick={handleResetClick}
              >
                Reset
              </Button>
              <Button className="bg-red-300 hover:bg-red-200">Delete</Button>
            </>
          )}
        </div>
        <div className="flex flex-1 justify-end gap-x-4">
          <Button className="bg-lime-300 hover:bg-lime-200">More</Button>
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
        { "bg-lime-200 dark:bg-lime-300": variant === "success" }
      )}
    >
      {children}
    </span>
  );
}
