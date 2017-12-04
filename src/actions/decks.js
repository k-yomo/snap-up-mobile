import firebase from 'react-native-firebase';
import uuid from 'uuid';

export const fetchDecks = uid => dispatch => {
  const ref = firebase.firestore().collection('users').doc(uid).collection('decks');
  ref.get().then(querySnapShot => {
    const decks = [];
    querySnapShot.forEach((doc) => {
      const deck = doc.data();
      deck.id = doc.id;
      decks.push(deck);
    });
    dispatch(setDecks(decks));
  });
};

const setDecks = decks => ({
  type: 'SET_DECKS',
  decks
});

export const postDeck = (uid, title) => dispatch => {
  const deckId = uuid();
  const ref = firebase.firestore().collection(`users/${uid}/decks`).doc(deckId);
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

export const deleteDeck = (uid, deckId) => dispatch => {
  firebase.firestore().doc(`users/${uid}/decks/${deckId}`).delete();
  dispatch(removeDeck(deckId));
};

const removeDeck = id => ({
  type: 'REMOVE_DECK',
  id
});
