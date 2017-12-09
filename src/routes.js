import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import DecksPage from './containers/DecksPage';
import StudyPage from './containers/StudyPage';
import DeckInfoPage from './containers/DeckInfoPage';

const Router = StackNavigator(
  {
    Home: { screen: DecksPage },
    Study: { screen: StudyPage },
    DeckInfo: { screen: DeckInfoPage }
  },
  {
     initialRouteName: 'Home',
     transitionConfig: () => ({
    screenInterpolator: props => {
      if (props.scene.route.routeName === 'Study') {
        return CardStackStyleInterpolator.forVertical(props);
      }
      return CardStackStyleInterpolator.forHorizontal(props);
    },
    })
});

export default Router;
