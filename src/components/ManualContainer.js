import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

const ManualContainer = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <Text style={styles.headerText}>User Manual</Text>
            </View>
            <View style={styles.touchableView}>
                <TouchableOpacity onPress={() => navigation.navigate('Write')}>
                    <Text style={styles.touchableText}>Write Messages</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.touchableView}>
                <TouchableOpacity onPress={() => navigation.navigate('Read')}>
                    <Text style={styles.touchableText}>Read Messages</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 80,
        marginTop: 40,
        marginBottom: 70,
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        borderWidth: 4,
        borderColor: '#ccd1d1',
        alignItems: 'stretch'
    },
    headerView: {
        backgroundColor: '#008eb7',
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccd1d1'
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'white',
        marginTop: 3
    },
    touchableView: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccd1d1'
    },
    touchableText: {
        fontSize: 22,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 10
    }
});
export default withNavigation(ManualContainer);
