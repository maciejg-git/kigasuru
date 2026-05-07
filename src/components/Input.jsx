export default function Input({ className, ...props }) {
  return (
    <input
      type="text"
      {...props}
      className={
        "outline-hidden focus-within:ring-3 focus:outline-hidden flex items-center rounded-sm border border-gray-300 bg-white px-3 py-2 transition-shadow duration-200 focus-within:border-gray-400 focus-within:ring-violet-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus-within:ring-violet-300 " +
        className
      }
    />
  );
}
