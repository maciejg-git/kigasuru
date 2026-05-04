export default function JapaneseExample({ example }) {
  return (
    <div className="p-10 rounded-xl bg-sky-600 flex justify-center flex flex-col gap-y-10 items-center">
      <div className="text-4xl">
        {example.word}
      </div>
      <div className="text-2xl">
        {example.example_sentence}
      </div>
    </div>
  )
}
