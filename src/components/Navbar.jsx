import BGearFill from "../icons/BGearFill";
import ButtonOutline from "./ButtonOutline";
import BMoon from "../icons/BMoon";
import BSun from "../icons/BSun";
import BStack from "../icons/BStack";
import FaArrowLeftLongSolid from "../icons/FaArrowLeftLongSolid";
import BBarChart from "../icons/BBarChart";
import { motion } from "motion/react";

export default function Navbar({ setPage, onClickDarkMode, darkMode }) {
  return (
    <div className="fixed left-0 top-0 flex w-full items-center justify-between px-4 py-2">
      <span className="text-2xl font-semibold">Japan</span>
      <div className="flex gap-x-2">
        <ButtonOutline onClick={() => setPage("home")}>
          <FaArrowLeftLongSolid className="h-5 w-5 opacity-70"></FaArrowLeftLongSolid>
          Home
        </ButtonOutline>
        <ButtonOutline onClick={() => setPage("deck")}>
          <BStack className="opacity-70"></BStack>
          Deck
        </ButtonOutline>
        <ButtonOutline onClick={() => setPage("stats")}>
          <BBarChart className="opacity-70"></BBarChart>
          Stats
        </ButtonOutline>
        <ButtonOutline onClick={() => setPage("options")}>
          <BGearFill className="opacity-70"></BGearFill>
          Options
        </ButtonOutline>
        <button onClick={onClickDarkMode} className="ml-4">
          {!darkMode ? (
            <BSun className="h-5 w-5"></BSun>
          ) : (
            <BMoon className="h-5 w-5"></BMoon>
          )}
        </button>
      </div>
    </div>
  );
}
