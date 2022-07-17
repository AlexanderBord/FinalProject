import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';


const LoadingSpinner = () => {
    return (
    <View style={styles.container}>
        <ActivityIndicator size={120} color='#0066CC' />
    </View>
)}

export default LoadingSpinner;


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
