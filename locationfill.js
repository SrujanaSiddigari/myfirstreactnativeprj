import React, { Component } from 'react';
import { Text, Button, TextInput, View, StyleSheet } from 'react-native';
import Modal, { ModalContent } from 'react-native-modals';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
export default class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    keyPressed = () => {
        // alert("keyPressed");
        this.setState({ visible: true })
    }
    render() {
        const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
        const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
        
        return (
            <View style={styles.container}>
                <TextInput onKeyPress={(this.keyPressed.bind(this))} style={styles.textinp} placeholder="Enter Location"></TextInput>
                <Modal
                    visible={this.state.visible}
                    onTouchOutside={() => {
                        this.setState({ visible: false });
                    }}
                >
                    <ModalContent>
                        <Text>modalopened</Text>
                        <GooglePlacesAutocomplete
                            placeholder='Search'
                            minLength={2} // minimum length of text to search
                            autoFocus={false}
                            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                            keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                            listViewDisplayed='auto'    // true/false/undefined
                            fetchDetails={true}
                            renderDescription={row => row.description} // custom description render
                            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                                console.log(data, details);
                            }}

                            getDefaultValue={() => ''}

                            query={{
                                // available options: https://developers.google.com/places/web-service/autocomplete
                                key: 'AIzaSyA7quHv20PDJRm_PqL2jatrfR86wQ0NbsE',
                                language: 'en', // language of the results
                                types: '(cities)' // default: 'geocode'
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

                            currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                            currentLocationLabel="Current location"
                            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                            GoogleReverseGeocodingQuery={{
                                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                            }}
                            GooglePlacesSearchQuery={{
                                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                rankby: 'distance',
                                type: 'cafe'
                            }}

                            GooglePlacesDetailsQuery={{
                                // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                                fields: 'formatted_address',
                            }}

                            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                            predefinedPlaces={[homePlace, workPlace]}

                            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                            // renderLeftButton={() => <Image source={require('path/custom/left-icon')} />}
                            // renderRightButton={() => <Text>Custom text after the input</Text>}
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
        width: 400
    },
    textinp: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 30
    }
});
