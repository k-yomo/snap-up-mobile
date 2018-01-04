import firebase from 'react-native-firebase';

export const fetchDeckOrder = () => (dispatch, getState) => {
  const uid = getState().user.uid;
  const deckOrderRef = firebase.firestore().doc(`users/${uid}`);
  deckOrderRef.get().then(decksSnapShot =>
    dispatch(setDeckOrder(decksSnapShot.data().deckOrder.split(',')))
  );
};

export const addDeckToOrder = (deckId) => (dispatch, getState) => {
  const { user, deckOrder } = getState();
  deckOrder.unshift(deckId);
  firebase.firestore().doc(`users/${user.uid}`).update({ deckOrder: deckOrder.join(',') });
  dispatch(setDeckOrder(deckOrder));
};

export const deleteDeckFromOrder = (deletedDeckId) => (dispatch, getState) => {
  const uid = getState().user.uid;
  let deckOrder = getState().deckOrder;
  deckOrder = deckOrder.filter(deckId => deckId !== deletedDeckId);
  firebase.firestore().doc(`users/${uid}`).update({ deckOrder: deckOrder.join(',') });
  dispatch(setDeckOrder(deckOrder));
};

const setDeckOrder = (deckOrder) => ({
  type: 'SET_DECK_ORDER',
  deckOrder
});
