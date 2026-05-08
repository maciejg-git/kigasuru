export default function JapaneseExample({ example }) {
  return (
    <div className="flex flex-col items-center justify-center gap-y-10 rounded-xl border border-gray-200 bg-white p-10 shadow-lg dark:bg-gray-700 dark:border-gray-600">
      <div className="text-5xl">{example.word}</div>
      <div className="text-2xl text-black/60">{example.romaji}</div>
      <div className="text-2xl">{example.example_sentence}</div>
      <div>
        <a
          href={`https://jisho.org/word/${example.word}`}
          className="text-sky-500 underline"
        >
          Jisho
        </a>
      </div>
    </div>
  );
}
