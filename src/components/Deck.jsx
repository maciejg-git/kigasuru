import { useContext, useState } from "react";
import BottomBar from "./BottomBar.jsx";
import Button from "./Button.jsx";
import Input from "./Input.jsx";
import { OptionsContext } from "../options-context.js";
import clsx from "clsx";
import { State } from "ts-fsrs"
import DeckMoreDropdown from "./DeckMoreDropdown.jsx";

export default function Deck({ deck, deckSrsData, setModalOpen, setModalData, onSuspend, onReset }) {
  const options = useContext(OptionsContext);

  const [selectedItems, setSelectedItems] = useState(new Set());
  const [page, setPage] = useState("deck");
  const [card, setCard] = useState(null);

  function getCardDue(id) {
    let cardData = deckSrsData.current[id];
    if (!cardData || cardData.fsrs.state === State.New || cardData.suspended) {
      return null;
    }
    return new Date(cardData.fsrs.due).toISOString().substring(0, 10);
  }

  function isSuspended(id) {
    return deckSrsData.current[id]?.suspended === true;
  }

  function isOnlySelectedCardSuspended() {
    let id = selectedItems.values().next().value;
    return deckSrsData.current[id]?.suspended;
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

      return;
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

  function handleEditClick() {
    let id = selectedItems.values().next().value;
    let card = deck.cards.find((c) => c.id === id);
    setCard(card);
    setPage("edit");
  }

  function handleAddClick() {
    let card = { word: "", romaji: "", translation: "" };
    setCard(card);
    setPage("edit");
  }

  function handleSuspendClick() {
    let id = selectedItems.values().next().value
    onSuspend(id)
  }

  function handleResetClick() {
    setModalData({
      title: "Reset cards",
      message: `Reset ${selectedItems.size} cards`,
      labelAccept: "OK",
      labelCancel: "Cancel",
      onAccept: () => onReset(selectedItems)
    });
    setModalOpen(true);
  }

  return (
    <>
      <div className="mb-4 text-xl font-semibold">{deck.name}</div>

      {page === "deck" && (
        <DeckTable
          deck={deck}
          onItemClick={handleItemClick}
          selectedItems={selectedItems}
          getCardDue={getCardDue}
          isSuspended={isSuspended}
        ></DeckTable>
      )}
      {page === "edit" && <DeckEditCard card={card}></DeckEditCard>}

      <BottomBar className="p-4">
        {page === "deck" && (
          <>
            <div className="flex flex-1 gap-x-4">
              <Button className="bg-lime-300 hover:bg-lime-200" onClick={handleAddClick}>
                Add card
              </Button>
              {selectedItems.size === 1 && (
                <Button className="bg-lime-300 hover:bg-lime-200" onClick={handleEditClick}>
                  Edit card
                </Button>
              )}
            </div>
            <div className="flex gap-x-4">
              {selectedItems.size > 0 && (
                <>
                  {selectedItems.size === 1 && (
                    <Button
                      className="bg-yellow-300 hover:bg-yellow-200"
                      onClick={handleSuspendClick}
                    >
                      {isOnlySelectedCardSuspended() ? "Unsuspend" : "Suspend"}
                    </Button>
                  )}
                  <Button className="bg-yellow-300 hover:bg-yellow-200" onClick={handleResetClick}>
                    Reset
                  </Button>
                  <Button className="bg-red-300 hover:bg-red-200">Delete</Button>
                </>
              )}
            </div>
            <div className="flex flex-1 justify-end gap-x-4">
              <DeckMoreDropdown>
                <Button className="bg-lime-300 hover:bg-lime-200">More</Button>
              </DeckMoreDropdown>
            </div>
          </>
        )}
        {page === "edit" && (
          <>
            <div className="flex-1"></div>
            <div className="flex gap-x-4">
              <Button className="bg-lime-300 hover:bg-lime-200" onClick={handleSuspendClick}>
                Save
              </Button>
              <Button className="bg-yellow-300 hover:bg-yellow-200" onClick={handleResetClick}>
                Cancel
              </Button>
            </div>
            <div className="flex-1"></div>
          </>
        )}
      </BottomBar>
    </>
  );
}

function DeckEditCard({ card }) {
  return (
    <div className="flex flex-1 flex-col gap-y-4">
      <div className="flex flex-col gap-y-1">
        Word
        <Input value={card.word}></Input>
      </div>
      <div className="flex flex-col gap-y-1">
        Romaji
        <Input value={card.romaji}></Input>
      </div>
      <div className="flex flex-col gap-y-1">
        Translation
        <Input value={card.translation}></Input>
      </div>
    </div>
  );
}

function DeckTable({ deck, onItemClick, selectedItems, getCardDue, isSuspended }) {
  return (
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
                onClick={(e) => onItemClick(e, card.id)}
                className={clsx("*:p-2 border-t border-gray-300 dark:border-gray-600", {
                  "bg-neutral-100 dark:bg-gray-700": selectedItems.has(card.id),
                })}
              >
                <td className={clsx(isSuspended(card.id) && "opacity-30")}>{card.word}</td>
                <td className={clsx("text-sm", isSuspended(card.id) && "opacity-30")}>
                  {card.example_sentence}
                </td>
                <td>{card.translation}</td>
                <td>
                  {isSuspended(card.id) ? (
                    <Badge variant="warn">Suspended</Badge>
                  ) : (
                    getCardDue(card.id) || <Badge variant="success">New</Badge>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Badge({ children, variant }) {
  return (
    <span
      className={clsx("rounded-md px-2 py-1 text-sm font-semibold dark:text-gray-800", {
        "bg-lime-200 dark:bg-lime-300": variant === "success",
        "bg-yellow-200 dark:bg-yellow-300": variant === "warn",
      })}
    >
      {children}
    </span>
  );
}
