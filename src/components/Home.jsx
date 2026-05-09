import Button from "./Button.jsx"

export default function Home({onClickStart, data, deckSrsData}) {
  let newCardsCount = Object.keys(deckSrsData.current).length

  return (
    <div className="flex h-full">
      <div className="my-auto mx-auto flex flex-col gap-y-10">
        <div className="flex flex-col items-center">
          <span className="text-xl font-semibold mb-4">
            Japanese deck
          </span>
          <table>
            <tbody>
              <tr className="*:px-2">
                <td>
                  Cards
                </td>
                <td>
                  {data.length}
                </td>
              </tr>
              <tr className="*:px-2">
                <td>
                  New cards
                </td>
                <td>
                  {data.length - newCardsCount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Button className="bg-green-300 hover:bg-green-200" onClick={onClickStart}>
          Start
        </Button>
      </div>
    </div>
  )
}
