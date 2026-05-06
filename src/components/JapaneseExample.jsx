export default function JapaneseExample({ example }) {
  return (
    <div className="flex flex-col items-center justify-center gap-y-10 rounded-xl p-10 border border-gray-200 shadow-lg bg-white">
      <div className="text-5xl">{example.word}</div>
      <div className="text-2xl">{example.example_sentence}</div>
    </div>
  );
}
