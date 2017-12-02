import { StackNavigator } from 'react-navigation';
import DecksPage from './containers/DecksPage';
import StudyPage from './containers/StudyPage';

const Router = StackNavigator(
  {
    Home: { screen: DecksPage },
    Study: { screen: StudyPage }
  }
);

export default Router;
