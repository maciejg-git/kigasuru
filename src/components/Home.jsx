import Button from "./Button.jsx"

export default function Home({onClickStart, onClickDeck, data, deckSrsData}) {
  let newCardsCount = Object.keys(deckSrsData.current).length

  return (
    <div className="flex h-full">
      <div className="my-auto mx-auto flex flex-col gap-y-10">
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <span className="text-lg font-semibold">
              Japanese deck
            </span>
            <Button onClick={onClickDeck}>Details</Button>
          </div>
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
                  New
                </td>
                <td>
                  {data.length - newCardsCount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Button className="bg-green-400 hover:bg-green-300" onClick={onClickStart}>
          Start
        </Button>
      </div>
    </div>
  )
}
