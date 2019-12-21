import React, { Component } from 'react';
import { AsyncStorage, Text, View,StyleSheet,ScrollView } from 'react-native';
import config from './config';
import { BarChart, Grid, ProgressCircle } from 'react-native-svg-charts';
// import { FontAwesome } from 'react-native-vector-icons/FontAwesome';
export class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth_token: ''
    };
  }

  render() {
    const fill = 'rgb(134, 65, 244)'
    const chartData   = [20, 45, 28, 80, 99, 43]
    return (
          <ScrollView>
          <View style= {styles.container}>
          <Text style = {styles.txtstyl}>SalesCall</Text>
          <BarChart
          style={{ height: 200 }}
          data={ chartData }
          svg={{ fill }}
          contentInset={{ top: 30, bottom: 30 }}
           >
          <Grid/>
      </BarChart>
      <Text style = {styles.txtstyl}>SalesCall in progress</Text>
       <ProgressCircle
        style = {{height:200}}
        progress = {0.7}
        progressColor= {'rgb(134, 65, 244)'}
        >
       </ProgressCircle>
       
       <Text style = {styles.txtstyl}>SalesCall complete</Text>
       <ProgressCircle
        style = {{height:200}}
        progress = {0.9}
        progressColor= {'rgb(51, 244, 41)'}
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
container:{
  marginLeft:10,
  marginRight:10
},
txtstyl:{
  fontSize:48,
  marginBottom:12,
  marginTop:12
}
});