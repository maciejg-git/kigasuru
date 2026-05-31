import { useContext } from "react";
import Button from "./Button.jsx";
import { State } from "ts-fsrs";
import { isBefore } from "date-fns";
import { DateContext } from "../date-context.js";

export default function Home({ onClickStart, data, deckSrsData }) {
  let today = useContext(DateContext)

  let newCardsCount = Object.values(deckSrsData.current).filter((card) => {
    return card.fsrs.state === State.New;
  });

  let initializedCardsCount = Object.keys(deckSrsData.current);

  let suspendedCardCount = Object.values(deckSrsData.current).filter((card) => {
    return card.suspended;
  });

  let reviewCardsCount = Object.values(deckSrsData.current).filter((card) => {
    return card.fsrs.state === State.Review && isBefore(card.fsrs.due, today);
  });

  return (
    <div className="flex h-full">
      <div className="my-auto mx-auto flex flex-col gap-y-16">
        <div className="flex flex-col items-center">
          <span className="text-xl font-semibold mb-4">{data.name}</span>
          <table>
            <tbody>
              <tr className="*:px-4 *:py-1">
                <td>Cards</td>
                <td>{data.cards.length}</td>
              </tr>
              <tr className="*:px-4 *:py-1">
                <td>New cards</td>
                <td>
                  {data.cards.length -
                    (initializedCardsCount.length - newCardsCount.length) -
                    suspendedCardCount.length}
                </td>
              </tr>
              <tr className="*:px-4 *:py-1">
                <td>Reviews</td>
                <td>{reviewCardsCount.length}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Button className="bg-lime-300 hover:bg-lime-200" onClick={onClickStart}>
          Start
        </Button>
      </div>
    </div>
  );
}
