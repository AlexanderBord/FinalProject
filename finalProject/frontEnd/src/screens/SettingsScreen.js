import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import ManualContainer from '../components/ManualContainer';
import SettingsContainer from '../components/SettingsContainer';

const SettingsScreen = ({ navigation }) => {

    return (
        <View style={styles.view}>
            <Text style={styles.header}>Settings</Text>
            <ManualContainer navigation={navigation} />
            <SettingsContainer />
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        flex: 1
    },
    backgroundStyle: {
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        fontSize: 50,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        textDecorationLine: 'underline',
        marginTop: 25
    },
});

export default SettingsScreen;
