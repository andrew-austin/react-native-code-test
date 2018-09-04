
import React, { Component } from 'react'
import { TabNavigator, StackNavigator,createStackNavigator } from 'react-navigation';
/* Navigator stacks */
import SplashView from './../containers/splashView'; 
import UserListView from './../containers/usersListView';

//const TopLevelNavigator = createStackNavigator({ /* ... */ })

export const AppStackRoot = createStackNavigator({

  splashView: {
      screen: SplashView,
      navigationOptions: {
          headerMode: 'screen' ,
          gesturesEnabled: false,
      },
    },
  userListView: {
    screen: UserListView,
    navigationOptions: { 
      gesturesEnabled: false,
  },
  }, 
},

   );


export default class AppStack extends Component {
  render() {
    return (<AppStackRoot />);
  }

}


