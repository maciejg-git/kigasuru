import BGearFill from "../icons/BGearFill";
import ButtonOutline from "./ButtonOutline";

export default function Navbar({ onClickOptions, onClickDeck }) {
  return (
    <div className="fixed left-0 top-0 flex w-full items-center justify-between px-4 py-2">
      <span className="text-2xl font-semibold">Japan</span>
      <div className="flex gap-x-2">
        <ButtonOutline onClick={onClickDeck}>
          <BGearFill className="opacity-70"></BGearFill>
          Deck
        </ButtonOutline>
        <ButtonOutline onClick={onClickOptions}>
          <BGearFill className="opacity-70"></BGearFill>
          Options
        </ButtonOutline>
      </div>
    </div>
  );
}
