import firebase from 'react-native-firebase';

export const fetchDeckOrder = () => (dispatch, getState) => {
  const uid = getState().user.uid;
  const deckOrderRef = firebase.firestore().doc(`users/${uid}`);
  deckOrderRef.get().then(decksSnapShot =>
    dispatch(setDeckOrder(decksSnapShot.data().deckOrder.split(',')))
  );
};

export const addDeckToOrder = (deckId) => (dispatch, getState) => {
  const { deckOrder } = getState();
  deckOrder.unshift(deckId);
  updateDeckOrder(deckOrder);
};

export const deleteDeckFromOrder = (deletedDeckId) => (dispatch, getState) => {
  let deckOrder = getState().deckOrder;
  deckOrder = deckOrder.filter(deckId => deckId !== deletedDeckId);
  updateDeckOrder(deckOrder);
};

export const updateDeckOrder = (deckOrder) => (dispatch, getState) => {
  const uid = getState().user.uid;
  firebase.firestore().doc(`users/${uid}`).update({ deckOrder: deckOrder.join(',') });
  dispatch(setDeckOrder(deckOrder));
};


const setDeckOrder = (deckOrder) => ({
  type: 'SET_DECK_ORDER',
  deckOrder
});
