
const defaultState =
[
  {
    id: 1,
    title: 'フレンズ英単語'
  },
  {
    id: 2,
    title: 'SUIT英単語'
  },
  {
    id: 3,
    title: 'フルハウス英単語'
  },
  {
    id: 4,
    title: 'テッククランチ英単語'
  },
  {
    id: 5,
    title: 'ニュースサイト英単語'
  },
  {
    id: 6,
    title: '日常会話英単語'
  },
  {
    id: 7,
      title: '日常会話英単語'
  },
  {
    id: 8,
    title: '日常会話英単語'
  },
  {
    id: 9,
    title: '日常会話英単語'
  }
]

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'DELETE_DECK':
      return state.filter(({ id }) => id !== action.deckId);
    default:
      return state;
  }
}
