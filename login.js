import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View, TextInput, Button, Image, Alert, Text } from 'react-native';
import { DashboardPage } from './dashboard.js';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import config from './config';
export class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            TextInputValue:'',
            Password:''
        }
    }
    buttonClickListener = () =>{
        const { TextInputValue } = this.state ;
        const { Password } = this.state ;
        // Alert.alert(TextInputValue);
        // Alert.alert(Password);
         fetch(config.API_URL + 'user-login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                username: TextInputValue,
                password: Password,
                rememberme : false,
                site_id: 1
               })
            }).then(response => response.json())
            .then((responseJson) => {
              if(responseJson.code == 200) {
                AsyncStorage.setItem('user_id',responseJson.data);
                this.props.navigation.navigate('Dashboard');
              } else {
                alert(JSON.stringify(responseJson.message));
              }
            })
            .catch((error) => {
              alert(error);
            })
    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.imgstyl} source={require('./images/repdonkey-2-full-logo.png')} />
                <TextInput style={styles.textinput}  onChangeText={TextInputValue => this.setState({TextInputValue})}>Username</TextInput>
                <TextInput style={styles.textinput} onChangeText={Password => this.setState({Password})} secureTextEntry={true}>Password</TextInput>
                <Button title="sign in" onPress={(this.buttonClickListener.bind(this))} />
                <Text style={styles.footercontent}>
                Copyright © 2019 Repdonkey Portal. {"\n"}All rights reserved.
                </Text>
            </View>
        );
    }
    // ButtonCall() {
    //     this.buttonClickListener;
    //     Alert.alert(this.state.value);
    //     // fetch('https://thefarmav-beta.repdonkey.com/wp-json/rd20demo/v1/get-authtoken'), {
    //     //     method: 'POST',
    //     //     headers: {
    //     //         'Accept': 'application/json',
    //     //         'Content-Type': 'application/json',
    //     //     },
    //     // }
    // }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20
    },
    textinput: {
        borderColor: 'gray',
        borderWidth: 1,
        width: 400,
        height: 50,
        marginBottom: 15
    },
    btnstyl: {
        marginTop: 20,
        padding: 20,
    },
    imgstyl: {
        width: 'auto',
        height: 95,
        marginBottom: 35
    },
    footercontent:{
        marginTop:20,
        justifyContent:'center',
        alignContent:'center',
        fontSize:19,
        textAlign:'center'
    }
});
const loginContainer = createStackNavigator({
    Home : LoginPage,
    Dashboard: DashboardPage
    });
    const Navigatorr = createAppContainer(loginContainer);
    export default Navigatorr;