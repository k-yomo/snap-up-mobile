import firebase from 'react-native-firebase';
import uuid from 'uuid';

export const fetchDecks = () => (dispatch, getState) => {
  const uid = getState().user.uid;
  const deckRef = firebase.firestore().collection(`users/${uid}/decks`);
  deckRef.get().then(decksSnapShot => {
    const decks = [];
    decksSnapShot.forEach(deckDoc => {
      const deck = deckDoc.data();
      deck.id = deckDoc.id;

      const cardRef = firebase.firestore().collection(`users/${uid}/decks/${deck.id}/cards`);
      cardRef.get().then(cardsSnapShot => {
        const cards = [];
        if (cardsSnapShot.docs) {
          cardsSnapShot.docs.forEach(cardDoc => {
            const card = cardDoc.data();
            card.id = cardDoc.id;
            cards.push(card);
          });
        }
        deck.cards = cards;
      });
      decks.push(deck);
    });
    dispatch(setDecks(decks));
  });
};

const setDecks = decks => ({
  type: 'SET_DECKS',
  decks
});

export const createDeck = (title) => (dispatch, getState) => {
  const uid = getState().user.uid;
  const deckId = uuid();
  const ref = firebase.firestore().doc(`users/${uid}/decks/${deckId}`);
  ref.set({ title });
  dispatch(addDeck(deckId, title));
};

const addDeck = (id, title) => ({
  type: 'ADD_NEW_DECK',
  deck: {
    id,
    title,
    cards: []
  }
});

export const deleteDeck = (deckId) => (dispatch, getState) => {
  const uid = getState().user.uid;
  firebase.firestore().doc(`users/${uid}/decks/${deckId}`).delete();
  dispatch(removeDeck(deckId));
};

const removeDeck = id => ({
  type: 'REMOVE_DECK',
  id
});
