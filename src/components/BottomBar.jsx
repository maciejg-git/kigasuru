export default function BottomBar({children, className}) {
  return (
    <div className={"fixed bottom-0 left-0 w-full flex items-center " + className}>
      {children}
    </div>
  )
}
