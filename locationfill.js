import React, { Component } from 'react';
import { Alert, Text, Button, TextInput, View, StyleSheet } from 'react-native';
import Modal, { ModalContent } from 'react-native-modals';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
export default class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            setlocation:''
        }
    }

    keyPressed = () => {
        // Alert.alert("keyPressed");
        this.setState({ visible: true });
    }
    closemodal = () => {
        this.setState({visible: false});
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder="Press a key to search your location" style={styles.textinp} onKeyPress={(this.keyPressed)} value={this.state.setlocation}></TextInput>
                <Modal
                    visible={this.state.visible}
                    setlocation={this.state.setlocation}
                    // onTouchOutside={() => {
                    //     this.setState({ visible: false });
                    // }}
                >
                    <ModalContent style={{ width: 400, height: 400 }}>
                        <GooglePlacesAutocomplete
                            placeholder='Search'
                            minLength={1} 
                            autoFocus={false}
                            returnKeyType={'search'} 
                            keyboardAppearance={'light'} 
                            listViewDisplayed='false'    // true/false/undefined
                            fetchDetails={true}
                            renderDescription={row => row.description} 
                            onPress={(data, details = null) => { 
                                console.log(data, details);
                                this.setState({ setlocation: data.description });
                            }}
                            getDefaultValue={() => ''}

                            query={{
                                key: 'AIzaSyA7quHv20PDJRm_PqL2jatrfR86wQ0NbsE',
                                language: 'en', 
                                types: 'address' 
                            }}

                            styles={{
                                textInputContainer: {
                                    width: '100%'
                                },
                                description: {
                                    fontWeight: 'bold'
                                },
                                predefinedPlacesDescription: {
                                    color: '#1faadb'
                                }
                            }}
                           
                        />
                     <Button
                     title='Close' onPress={(this.closemodal)}
                     />
                    </ModalContent>
                
                </Modal>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        width: 400,
        marginLeft: 10,
        marginRight: 10
    },
    textinp: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 30,
        borderWidth:1,
        borderColor:'gray'
    }
});
