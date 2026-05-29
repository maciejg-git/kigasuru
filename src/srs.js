import { State } from 'ts-fsrs'

function calculateLearnCards(data, cardsData, today, newCardsLimit) {
  let newCards = data
    .filter((card) => {
      return !cardsData[card.id]
    })
    .splice(0, newCardsLimit);

  let dueCards = getDueCards(data, cardsData, today)

  return [newCards, dueCards];
}

function getDueCards(data, cardsData, today) {
  return data.filter((card) => {
    let cardData = cardsData[card.id]
    if (cardData) {
      let due = new Date(cardData.fsrs.due)
      let review = cardData.fsrs.state === State.Review
      return due <= today && review
    }
  })
}

export {
  calculateLearnCards,
}
