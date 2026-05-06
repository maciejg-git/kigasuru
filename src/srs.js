function calculateLearnCards(data, cardsData, today, newCardsLimit) {
  let newCards = data
    .filter((card) => {
      return !cardsData[card.id]
    })
    .splice(0, newCardsLimit);

  let dueCards = getDueCards(data, cardsData, today)

  return [...newCards, ...dueCards];
}

function getCardDue(cardData, today) {
  let due = new Date(today);
  due.setUTCDate(today.getUTCDate() + (cardData.reviewed * 2));
  due.setUTCHours(0, 0, 0, 0)
  return due
}

function getDueCards(data, cardsData, today) {
  return data.filter((card) => {
    if (cardsData[card.id]) {
      if (cardsData[card.id].due) {
        let due = new Date(cardsData[card.id].due)
        return due <= today
      }
    }
  })
}

export {
  calculateLearnCards,
  getCardDue,
}
