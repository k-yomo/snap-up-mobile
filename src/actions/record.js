import firebase from 'react-native-firebase';

export const startRecord = (deckId) => ({
  type: 'START_RECORD',
  deckId
});

export const updateRecord = (score) => (dispatch, getState) => {
  const uid = getState().user.uid;
  const deckId = getState().record.deckId;
  const ref = firebase.firestore().doc(`users/${uid}/decks/${deckId}/cards/${score.card.id}`);
  ref.get().then(doc => {
    const proficiency = doc.data().proficiency;
    if (score.know && proficiency < 5) {
      ref.update({ proficiency: proficiency + 1 });
    } else if (!score.know && proficiency > 0) {
      ref.update({ proficiency: proficiency - 1 });
    }
  });
  dispatch(addRecord(score));
};

const addRecord = (score) => ({
  type: 'ADD_RECORD',
  score
});

export const resetRecord = () => ({
  type: 'RESET_RECORD'
});
