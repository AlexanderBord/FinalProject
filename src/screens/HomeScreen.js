import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.backgroundStyle}>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Ionicons name="settings-outline" style={styles.settingsIcon} />
            </TouchableOpacity>
            <FontAwesome name="assistive-listening-systems" style={styles.assistIcon} />
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: '#008eb7',
        flex: 1
    },
    settingsIcon: {
        fontSize: 60,
        color: "white",
        alignSelf: 'flex-end',
        marginHorizontal: 10,
        marginTop: 10
    },
    assistIcon: {
        fontSize: 150,
        color: "white",
        alignSelf: 'center',
        marginHorizontal: 10,
        marginTop: 160
    }
});

export default HomeScreen;