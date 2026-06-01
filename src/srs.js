import { State } from 'ts-fsrs'
import { isBefore } from 'date-fns';

function getLearnCards(data, cardsData, today, newCardsLimit) {
  let newCards = data
    .filter((card) => {
      return !cardsData[card.id] || (cardsData[card.id].fsrs.state === State.New && !cardsData[card.id].suspended)
    })
    .splice(0, newCardsLimit);

  let dueCards = getReviewCards(data, cardsData, today)

  let learningCards = getLearningCards(data, cardsData)

  return [newCards, learningCards, dueCards];
}

function getLearningCards(data, cardsData) {
  return data.filter((card) => {
    let cardData = cardsData[card.id]
    if (cardData) {
       return cardData.fsrs.state === State.Learning
    }
  })
}

function getReviewCards(data, cardsData, today) {
  return data.filter((card) => {
    let cardData = cardsData[card.id]
    if (cardData) {
      let due = new Date(cardData.fsrs.due)
      let review = cardData.fsrs.state === State.Review
      return isBefore(due, today) && review
    }
  })
}

export {
  getLearnCards,
}
