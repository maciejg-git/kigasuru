import { useId } from "react"
import Input from "./Input";
import Switch from "./Switch";

export default function Options({ options, setOptions }) {
  let newCardsId = useId()
  let reviewCardsId = useId()
  let showRomaji = useId()
  let showJisho = useId()

  return (
    <div className="flex w-full flex-col gap-y-6 rounded-xl border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-600 dark:bg-gray-700">
      <div className="text-lg font-semibold">Daily limits</div>
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center">
          <label htmlFor={newCardsId}>New cards/day</label>
          <Input
            value={options.newCards}
            onChange={(e) =>
              setOptions({ ...options, newCards: e.target.value })
            }
            type="text"
            id={newCardsId}
            className="ml-auto"
          ></Input>
        </div>
        <div className="flex items-center">
          <label htmlFor={reviewCardsId}>Max reviews/day</label>
          <Input
            value={options.reviewCards}
            onChange={(e) =>
              setOptions({ ...options, newCards: e.target.value })
            }
            type="text"
            id={reviewCardsId}
            className="ml-auto"
          ></Input>
        </div>
      </div>

      <div className="border-b border-gray-200"></div>

      <div className="text-lg font-semibold">Cards</div>
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center">
          <label htmlFor={showRomaji}>Show romaji</label>
          <Switch
            className="ml-auto"
            value={options.showRomaji}
            onClickSwitch={() =>
              setOptions({ ...options, showRomaji: !options.showRomaji })
            }
            id={showRomaji}
          ></Switch>
        </div>
        <p className="text-sm text-black/60 dark:text-gray-200/60 ml-2">Romaji is the use of Latin script to write the Japanese language</p>
        <div className="flex items-center">
          <label htmlFor={showJisho}>Show Jisho link</label>
          <Switch
            className="ml-auto"
            value={options.showJisho}
            onClickSwitch={() =>
              setOptions({ ...options, showJisho: !options.showJisho })
            }
            id={showJisho}
          ></Switch>
        </div>
      </div>
    </div>
  );
}
