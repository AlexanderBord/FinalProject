import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReadManual = () => {
    return (
        <View style={styles.backgroundStyle}>
            <Text style={styles.header}>Read Manual</Text>
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
        marginTop: 15
    }
});

export default ReadManual;