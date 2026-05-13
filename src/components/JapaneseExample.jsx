import { useContext } from "react";
import { OptionsContext } from "../options-context.js";

export default function JapaneseExample({ example }) {
  const options = useContext(OptionsContext);

  return (
    <div className="flex flex-col items-center justify-center gap-y-10 rounded-xl border border-gray-200 bg-white p-10 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div className="text-5xl">{example.word}</div>
      {options.showRomaji && (
        <div className="text-2xl text-black/50 dark:text-gray-200/70">
          {example.romaji}
        </div>
      )}
      <div className="text-2xl">{example.example_sentence}</div>
      {options.showJisho && (
        <a
          href={`https://jisho.org/word/${example.word}`}
          className="text-sky-500 underline dark:text-sky-300"
        >
          Jisho
        </a>
      )}
    </div>
  );
}
