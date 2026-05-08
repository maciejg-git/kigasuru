import Input from "./Input";
import Switch from "./Switch";

export default function Options({ options, setOptions }) {
  return (
    <div className="flex w-full flex-col gap-y-6 rounded-xl border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-600 dark:bg-gray-700">
      <div className="text-lg font-semibold">Daily limits</div>
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center">
          <label htmlFor="">New cards/day</label>
          <Input
            value={options.newCards}
            onChange={(e) =>
              setOptions({ ...options, newCards: e.target.value })
            }
            type="text"
            className="ml-auto"
          ></Input>
        </div>
        <div className="flex items-center">
          <label htmlFor="">Max reviews/day</label>
          <Input
            value={options.newCards}
            onChange={(e) =>
              setOptions({ ...options, newCards: e.target.value })
            }
            type="text"
            className="ml-auto"
          ></Input>
        </div>
      </div>
      <div className="text-lg font-semibold">Cards</div>
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center">
          <label htmlFor="">Romaji</label>
          <Switch
            className="ml-auto"
            value={options.romaji}
            onClickSwitch={() =>
              setOptions({ ...options, romaji: !options.romaji })
            }
          ></Switch>
        </div>
      </div>
    </div>
  );
}
