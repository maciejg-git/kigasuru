import { useContext } from "react";
import BottomBar from "./BottomBar.jsx";
import { OptionsContext } from "../options-context.js";

export default function Deck({deck, deckSrsData}) {
  const options = useContext(OptionsContext)

  return (
    <>
      <div className="w-full p-2 rounded-xl border border-gray-200 shadow-lg bg-white dark:bg-gray-700 dark:border-gray-600">
        <table className="text-lg w-full">
          <thead className="font-semibold">
            <tr className="*:p-2 border-b border-gray-300 dark:border-gray-500">
              <td>Word</td>
              <td>Sentence</td>
              <td>Translation</td>
            </tr>
          </thead>
          <tbody>
            {deck.map((card) => {
              return (
                <tr key={card.id} className="*:p-2 border-t border-gray-300 dark:border-gray-500">
                  <td>
                    {card.word}
                  </td>
                  <td>
                    {card.example_sentence}
                  </td>
                  <td>
                    {card.translation}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <BottomBar>
        <div className="flex-1"></div>
        <div className="flex gap-x-4">
        </div>
        <div className="flex-1 flex justify-end">
        </div>
      </BottomBar>
    </>
  )
}
