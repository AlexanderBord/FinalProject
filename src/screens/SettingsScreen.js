import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ManualContainer from '../components/ManualContainer';
import SettingsContainer from '../components/SettingsContainer';

const SettingsScreen = () => {
    return (
        <View style={styles.backgroundStyle}>
            <Text style={styles.header}>Settings</Text>
            <ManualContainer />
            <SettingsContainer />
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: '#008eb7',
        flex: 1
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