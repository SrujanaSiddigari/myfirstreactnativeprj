import React, { Component } from 'react';
import { AsyncStorage, Text, View, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import config from './config';
import { BarChart, Grid, ProgressCircle } from 'react-native-svg-charts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import  { LoginPage }  from './login.js';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
export class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth_token: ''
    };
  }
  clickedButton = () =>{
    AsyncStorage.removeItem('auth_token');
    this.props.navigation.navigate('Home');
    // Alert.alert('logout clicked');
  }
  render() {
    const fill = 'rgb(134, 65, 244)'
    const chartData = [20, 45, 28, 80, 99, 43]
    return (

      <ScrollView>
        <TouchableOpacity onPress={(this.clickedButton)} style={styles.icon4}>
            <FontAwesome name="sign-out" style={styles.logouticn}/>
        </TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.txtstyl}>SalesCall</Text>
          <BarChart
            style={{ height: 200 }}
            data={chartData}
            svg={{ fill }}
            contentInset={{ top: 30, bottom: 30 }}
          >
            <Grid />
          </BarChart>
          <Text style={styles.txtstyl}>SalesCall in progress</Text>
          <ProgressCircle
            style={{ height: 200 }}
            progress={0.7}
            progressColor={'rgb(134, 65, 244)'}
          >
          </ProgressCircle>

          <Text style={styles.txtstyl}>SalesCall complete</Text>
          <ProgressCircle
            style={{ height: 200 }}
            progress={0.9}
            progressColor={'rgb(51, 244, 41)'}
          >
          </ProgressCircle>
        </View>
      </ScrollView>
    );
  }
  async componentDidMount() {
    const userId = await AsyncStorage.getItem('user_id');
    /* get authtoken */
    fetch(config.API_URL + 'get-authtoken', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_master_id: 1,
        client_id: config.CLIENT_KEY,
        is_web: 1,
        user_id: userId
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.code == 200) {
          AsyncStorage.setItem('auth_token', responseJson.data.auth_token);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }
}
const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10
  },
  txtstyl: {
    fontSize: 48,
    marginBottom: 12,
    marginTop: 12
  },
  logouticn:{
    fontSize: 32,
    height: 32,
    width: 32
  },
  icon4: {
    left: 400,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 90,
    height: 32,
    width: 32,
    top: 0
  }
});
const navigationPages = createStackNavigator({
        // Home : LoginPage,
        // Dasboard : DashboardPage
        Home: {
          screen: () => <LoginPage/>
       }
});
const navigate = createAppContainer(navigationPages);
export default navigate;