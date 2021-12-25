import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import ReadManual from './src/screens/ReadManual';
import SettingsScreen from './src/screens/SettingsScreen';
import WriteManual from './src/screens/WriteManual';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Settings: SettingsScreen,
    Read: ReadManual,
    Write: WriteManual
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'Voice Translate',
    },
  });

export default createAppContainer(navigator);