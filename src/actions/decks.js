import firebase from 'react-native-firebase';
import uuid from 'uuid';
import { fetchCards } from './cards';

export const fetchDecks = () => (dispatch, getState) => {
  const uid = getState().user.uid;
  const decksRef = firebase.firestore().collection(`users/${uid}/decks`);
  decksRef.get().then(decksSnapShot => {
    const decks = [];
    decksSnapShot.forEach(deckDoc => {
      const deck = { id: deckDoc.id, ...deckDoc.data(), cards: [] };
      deck.cards = fetchCards(uid, deck.id);
      decks.push(deck);
    });
    dispatch(setDecks(decks));
  });
};

const setDecks = decks => ({
  type: 'SET_DECKS',
  decks
});

export const fetchDeck = (deckId) => (dispatch, getState) => {
  const uid = getState().user.uid;
  const deckRef = firebase.firestore().doc(`users/${uid}/decks/${deckId}`);
  deckRef.get().then(deckDoc => {
    const deck = { id: deckDoc.id, ...deckDoc.data(), cards: [] };
    deck.cards = fetchCards(uid, deck.id);
    dispatch(setDeck(deck));
  });
};

const setDeck = (deck) => ({
  type: 'SET_DECK',
  deck
});

export const createDeck = (title) => (dispatch, getState) => {
  const uid = getState().user.uid;
  const deckId = uuid();
  const index = getState().decks.length();
  const ref = firebase.firestore().doc(`users/${uid}/decks/${deckId}`);
  ref.set({ title, index });
  dispatch(addDeck(deckId, title, index));
};

const addDeck = (id, title, index) => ({
  type: 'ADD_NEW_DECK',
  deck: {
    id,
    title,
    index,
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
