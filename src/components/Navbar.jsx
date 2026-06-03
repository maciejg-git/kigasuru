import BGearFill from "../icons/BGearFill";
import ButtonOutline from "./ButtonOutline";
import BStack from "../icons/BStack";
import FaArrowLeftLongSolid from "../icons/FaArrowLeftLongSolid";
import BBarChart from "../icons/BBarChart";
import DarkModeButton from "./DarkModeButton";

export default function Navbar({ onPageChange, onClickDarkMode, darkMode }) {
  return (
    <div className="fixed left-0 top-0 flex w-full items-center justify-between px-4 py-2">
      <span className="text-2xl font-semibold">Kigasuru</span>
      <div className="flex gap-x-2">
        <ButtonOutline onClick={() => onPageChange("home")}>
          <FaArrowLeftLongSolid className="h-5 w-5 opacity-70"></FaArrowLeftLongSolid>
          Home
        </ButtonOutline>
        <ButtonOutline onClick={() => onPageChange("deck")}>
          <BStack className="opacity-70"></BStack>
          Deck
        </ButtonOutline>
        <ButtonOutline onClick={() => onPageChange("stats")}>
          <BBarChart className="opacity-70"></BBarChart>
          Stats
        </ButtonOutline>
        <ButtonOutline onClick={() => onPageChange("options")}>
          <BGearFill className="opacity-70"></BGearFill>
          Options
        </ButtonOutline>
        <DarkModeButton
          darkMode={darkMode}
          onClickDarkMode={onClickDarkMode}
        ></DarkModeButton>
      </div>
    </div>
  );
}
