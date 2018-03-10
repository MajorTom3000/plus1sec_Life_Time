'use strict';
import {
  StackNavigator,TabNavigator
} from 'react-navigation';

import SearchPage from './SearchPage';
import SearchResults from './SearchResults';
import PersonalForm from './PersonalForm'

const App = TabNavigator({
  Home: { screen: SearchPage },
  Results: { screen: SearchResults },
});

//export default App;
module.exports = App;