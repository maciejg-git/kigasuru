export default function Button({ children, className, onClick, ...props }, ref) {
  return (
    <button
      ref={ref}
      {...props}
      onClick={onClick}
      className={
        "flex items-center justify-center gap-x-2 rounded-lg px-10 py-3 font-semibold dark:text-gray-800 shadow-lg dark:opacity-80 " +
        className
      }
    >
      {children}
    </button>
  );
}
