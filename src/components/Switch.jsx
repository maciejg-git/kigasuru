export default function Switch({ value, onClickSwitch, className, ...props }) {
  return (
    <div
      className={"group flex cursor-pointer items-center gap-x-4 " + className}
      onClick={onClickSwitch}
    >
      <input type="checkbox" checked={value} {...props} readOnly className="sr-only" />
      <div className="group-has-checked:bg-violet-400 group-has-focus:ring-4 dark:group-has-checked:bg-violet-400 relative flex h-6 w-11 items-center rounded-full bg-neutral-200 px-0.5 ring-violet-200 dark:bg-neutral-800">
        <div className="group-has-checked:translate-x-full group-has-checked:border-0 absolute left-0.5 top-0.5 h-5 w-5 rounded-full border border-neutral-300 bg-white shadow-sm transition-all dark:border-neutral-400"></div>
      </div>
    </div>
  );
}
