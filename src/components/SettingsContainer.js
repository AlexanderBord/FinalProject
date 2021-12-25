import React, { useState } from 'react';
import { View, StyleSheet, Picker, Text } from 'react-native';

const SettingsContainer = () => {

    const [language, setLanguage] = useState("English");
    const [numOfMessages, setNumOfMessages] = useState("1");
    const [theme, setTheme] = useState("Original");

    return (
        <View style={styles.container}>
            <View style={styles.setting}>
                <Text style={styles.text}>Language</Text>
                <Picker
                    selectedValue={language}
                    style={styles.dropDown}
                    onValueChange={(itemValue, itemIndex) => setLanguage(itemValue)}
                >
                    <Picker.Item label="English" value="eng" />
                    <Picker.Item label="Hebrew" value="heb" />
                </Picker>
            </View>
            <View style={styles.setting}>
                <Text style={styles.text}>Message</Text>
                <Picker
                    selectedValue={numOfMessages}
                    style={styles.dropDown}
                    onValueChange={(itemValue, itemIndex) => setNumOfMessages(itemValue)}
                >
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                </Picker>
            </View>
            <View style={styles.setting}>
                <Text style={styles.text}>Theme</Text>
                <Picker
                    selectedValue={theme}
                    style={styles.dropDown}
                    onValueChange={(itemValue, itemIndex) => setTheme(itemValue)}
                >
                    <Picker.Item label="Original" value="orig" />
                    <Picker.Item label="Dark" value="dark" />
                </Picker>
            </View>
        </View>
    );
};




const styles = StyleSheet.create({
    container: {
        height: 200,
        marginBottom: 90,
        borderWidth: 1,
        borderColor: 'red',
        marginHorizontal: 60,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 4,
        borderColor: '#ccd1d1',
        alignItems: 'stretch'
    },
    dropDown: {
        marginLeft: 20,
        flex: 1,
        paddingTop: 40,
        marginVertical: 2,

    },
    setting: {
        alignItems: "center",
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#ccd1d1',
        flex: 1
    },
    text: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 2,
        marginHorizontal: 10,
        width: 100,
    }


});

export default SettingsContainer;