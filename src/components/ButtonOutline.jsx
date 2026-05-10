export default function ButtonOutline({ children, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        "flex items-center gap-x-1 rounded-lg px-2 py-1 font-semibold dark:border-gray-400 dark:text-gray-300 " +
        className
      }
    >
      {children}
    </button>
  );
}
