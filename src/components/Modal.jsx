export default function Modal({ children }) {
  return (
    <div id="modal">
      <div className="fixed inset-0 z-40 overflow-y-auto bg-black/50"></div>
      <div className="fixed inset-0 z-40 overflow-y-auto">
        <div className="relative mx-auto flex min-h-full items-center px-6 py-6 md:w-6/12 md:px-0">
          <div className="text-text-800 dark:bg-dark-800 dark:text-text-300 flex-1 overflow-auto rounded-md bg-white shadow-lg">
            <header className="text-text-800 dark:text-text-300 flex items-center justify-between px-6 py-5 text-lg font-medium leading-6">
              Lorem Ipsum is simply dummy text
              <button className="dark:hover:bg-dark-600 rounded-md p-2 hover:bg-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                </svg>
              </button>
            </header>
            <div className="px-6 py-5">{children}</div>
            <footer className="flex justify-end gap-x-6 px-10 py-6">
              <button className="font-semibold">OK</button>
              <button className="font-semibold">Close</button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
