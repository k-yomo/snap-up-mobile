import { StackNavigator } from 'react-navigation';
import DecksPage from './containers/DecksPage';
import StudyPage from './containers/StudyPage';
import DeckInfoPage from './containers/DeckInfoPage';

const Router = StackNavigator(
  {
    Home: { screen: DecksPage },
    Study: { screen: StudyPage },
    DeckInfo: { screen: DeckInfoPage }
  }
);

export default Router;
