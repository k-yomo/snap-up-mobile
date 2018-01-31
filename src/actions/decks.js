import firebase from 'react-native-firebase';
import uuid from 'uuid';
import { fetchCards } from './cards';
import { addDeckToOrder, deleteDeckFromOrder } from './deckOrder';

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

export const setDeck = (deck) => ({
  type: 'SET_DECK',
  deck
});

export const createDeck = (title) => (dispatch, getState) => {
  const uid = getState().user.uid;
  const deckId = uuid();
  const ref = firebase.firestore().doc(`users/${uid}/decks/${deckId}`);
  ref.set({ title });
  dispatch(addDeck(deckId, title));
  dispatch(addDeckToOrder(deckId));
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
  dispatch(deleteDeckFromOrder(deckId));
};

const removeDeck = id => ({
  type: 'REMOVE_DECK',
  id
});
