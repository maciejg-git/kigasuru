import { useId } from "react";
import Input from "./Input";
import Switch from "./Switch";
import Separator from "./Separator";

export default function Options({ options, setOptions }) {
  let newCardsId = useId();
  let reviewCardsId = useId();
  let showRomaji = useId();
  let showJisho = useId();

  return (
    <div className="flex w-full flex-col gap-y-6 rounded-xl border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-600 dark:bg-gray-800 max-w-5xl mx-auto">
      <OptionHeader>Daily limits</OptionHeader>
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

      <Separator />

      <OptionHeader>Cards</OptionHeader>
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
        <OptionDescription>
          Romaji is the use of Latin script to write the Japanese language
        </OptionDescription>
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
        <OptionDescription>
          Jisho is a powerful Japanese-English dictionary. It lets you find words, kanji, example sentences and more quickly and easily. When enabled, a dictionary link for the word is displayed on every card.
        </OptionDescription>
      </div>

      <Separator />

      <OptionHeader>Order</OptionHeader>
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center">
          <label htmlFor={showRomaji}>Card order</label>
          <div className="ml-auto">
            <select className="outline-hidden focus-within:ring-3 focus:outline-hidden flex items-center rounded-sm border border-gray-300 bg-white px-3 py-2 transition-shadow duration-200 focus-within:border-gray-400 focus-within:ring-violet-200 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:focus-within:ring-violet-300">
              <option value="">New first</option>
              <option value="">Review first</option>
              <option value="">Mixed</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

function OptionDescription({children}) {
  return (
    <p className="ml-2 text-sm text-black/60 dark:text-gray-200/60">
      {children}
    </p>
  )
}

function OptionHeader({children}) {
  return (
    <div className="text-lg font-semibold">{children}</div>
  )
}
