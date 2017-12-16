import firebase from 'react-native-firebase';

export const startRecord = (deckId) => ({
  type: 'START_RECORD',
  deckId
});

export const updateRecord = (score) => (dispatch, getState) => {
  const uid = getState().user.uid;
  const deckId = getState().record.deckId;
  const ref = firebase.firestore().doc(`users/${uid}/decks/${deckId}/cards/${score.cardId}`);
  console.log(ref);
  dispatch(addRecord(score));
};

const addRecord = (score) => ({
  type: 'ADD_RECORD',
  score
});

export const resetRecord = () => ({
  type: 'RESET_RECORD'
});
