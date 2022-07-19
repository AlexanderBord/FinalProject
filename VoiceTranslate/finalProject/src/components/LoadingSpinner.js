import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

//Component responsible for the rotating spinner to display a user indication to the TTS output
const LoadingSpinner = () => {
    return (
    <View style={styles.container}>
        <ActivityIndicator size={120} color='#0066CC' />
    </View>
)}

export default LoadingSpinner;

//styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
