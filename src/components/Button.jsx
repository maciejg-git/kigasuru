export default function Button({ children, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={ 'rounded-md py-3 px-5 font-semibold flex gap-x-2 items-center justify-center ' + className }
    >
      { children }
    </button>
  )
}
