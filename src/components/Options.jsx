import Input from "./Input";

export default function Options({ options, setOptions }) {
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
      <div className="mb-4 text-lg font-semibold">Daily limits</div>
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
    </div>
  );
}
