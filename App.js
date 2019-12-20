/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{Component} from 'react';
// import LoginPage from './login';
import { View } from 'react-native';
import  { LoginPage } from './login';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import  { DashboardPage }  from './dashboard'; 
 class AppClass extends Component {
  render(){
    return(
      <View>
        <LoginPage/>
      </View>
    );
  }
}
const loginContainer = createStackNavigator({
Home : LoginPage,
Dashboard: DashboardPage
});
const Navigatorr = createAppContainer(loginContainer);
export default Navigatorr;