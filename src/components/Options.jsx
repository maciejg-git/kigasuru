export default function Options({ options, setOptions }) {
  return (
    <div className="flex w-full flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
      <div className="mb-4 text-lg font-semibold">Daily limits</div>
      <div className="flex">
        <label htmlFor="">New cards</label>
        <input
          value={options.newCards}
          onChange={(e) => setOptions({ ...options, newCards: e.target.value })}
          type="text"
          className="ml-auto"
        />
      </div>
    </div>
  );
}
