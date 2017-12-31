import firebase from 'react-native-firebase';
import uuid from 'uuid';
import moment from 'moment';

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

export const createCard = (deckId, card) => (dispatch, getState) => {
  const uid = getState().user.uid;
  const cardId = uuid();
  card.createdAt = moment().valueOf();
  card.updatedAt = moment().valueOf();
  const ref = firebase.firestore().doc(`users/${uid}/decks/${deckId}/cards/${cardId}`);
  ref.set(card);
  dispatch(addCard(deckId, cardId, card));
};

const addCard = (deckId, cardId, card) => ({
  type: 'ADD_NEW_CARD',
  deckId,
  card: {
    id: cardId,
    ...card
  }
});

export const deleteCard = (deckId, cardId) => (dispatch, getState) => {
  const uid = getState().user.uid;
  dispatch(removeCard(deckId, cardId));
  firebase.firestore().doc(`users/${uid}/decks/${deckId}/cards/${cardId}`).delete();
};

const removeCard = (deckId, cardId) => ({
  type: 'REMOVE_CARD',
  deckId,
  cardId
});
