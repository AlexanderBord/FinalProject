import React from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import AssistButton from '../components/AssistButton';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Text style={styles.header}>Settings</Text>
            </TouchableOpacity>
            <AssistButton />
        </View>
    )
};

HomeScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Text style={styles.header}>Settings</Text>
            </TouchableOpacity>
        )
    };
};

const styles = StyleSheet.create({
    header: {
        color: 'black',
        fontSize: 30,
    },
    backgroundStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    settingsIcon: {
        fontSize: 50,
        color: "black",
        alignSelf: 'flex-end',
        marginHorizontal: 10,
    },
    assistIcon: {
        fontSize: 170,
        color: "white",
        alignSelf: 'center',
        marginHorizontal: 10,
        marginVertical: 150
    },
    text: {
        color: '#fff',
        fontSize: 25,
    }
});

export default HomeScreen;
