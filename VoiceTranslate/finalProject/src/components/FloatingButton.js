import React from 'react';
import { View, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { setLoggedIn, setWhatsAppAuthentication } from '../asyncStorage/AsyncStorage';
import * as Animatable from 'react-native-animatable';

//A floating button component inside the main screen, used to display the settings and a logout button
const FloatingButton = ({ navigation }) => { 

    //handle the log out procedure, update the relevant states and navigates to sign in screen
    const handleLogOut = () => {
        setLoggedIn("loggedOut");
        setWhatsAppAuthentication("disapproved");
        navigation.navigate("SignIn");
    }

    //navigate to settings screen
    const navigateToSettingsScreen = () => {
        navigation.navigate("Settings");
    }

    return (
        <View style={styles.floatingView}>
            <Animatable.View animation="jello" duration={1200} >
                <ActionButton ActionButton buttonColor="#3498db" position='right'>
                    <ActionButton.Item buttonColor='#3498db' title="Log Out" onPress={() => handleLogOut()}>
                        <FontAwesome name="sign-out" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#3498db' title="Settings" onPress={() => navigateToSettingsScreen()}>
                        <FontAwesome name="cog" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </Animatable.View>
        </View>
    );
}

//styles
const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    floatingView: {
        flex: 1,
        bottom: 100,
        right: 50,
        alignSelf: 'flex-end',
        flexDirection: 'column',
    }
});

export default FloatingButton;
