import firebase from 'react-native-firebase';
import uuid from 'uuid';

export const fetchCards = (uid, deckId) => dispatch => {
  const ref = firebase.firestore().collection(`users/${uid}/decks/${deckId}/cards`);
  ref.get().then(querySnapShot => {
    const cards = [];
    querySnapShot.forEach((doc) => {
      const card = doc.data();
      card.id = doc.id;
      cards.push(card);
    });
    dispatch(setCards(cards));
  });
};

const setCards = cards => ({
  type: 'SET_CARDS',
  cards
});

export const createCard = (uid, deckId, card) => dispatch => {
  const cardId = uuid();
  const ref = firebase.firestore().doc(`users/${uid}/decks/${deckId}/cards/${cardId}`);
  ref.set(card);
  dispatch(addCard(deckId, cardId, card));
};

const addCard = (deckId, cardId, card) => ({
  type: 'ADD_NEW_CARD',
  deckId,
  card: {
    ...card,
    id: cardId
  }
});
