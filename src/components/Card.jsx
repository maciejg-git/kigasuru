import JapaneseExample from "./JapaneseExample"
import Translation from "./Translation"

export default function Card({ currentExample, showAnswer }) {
  return (
    <div className="flex flex-col gap-y-4 max-w-4xl mx-auto">
      <JapaneseExample example={currentExample}>
      </JapaneseExample>
      {showAnswer && (
        <Translation translation={currentExample.translation}>
        </Translation>
      )}
    </div>
  )
}
