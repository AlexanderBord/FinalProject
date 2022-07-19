import React, { useState } from 'react';
import { Text,View, Switch,TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SettingsList from 'react-native-settings-list';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Picker } from '@react-native-picker/picker';
import * as Animatable from 'react-native-animatable';
import styles from '../styles/SettingsScreenStyles';
import {
    regExOfCommands_HE, regExOfCommands_EN, regExOfCommands_RU, regExOfCommands_AR,
    assistantMessages_EN, assistantMessages_RU, assistantMessages_AR, assistantMessages_HE,
    userInput_EN, userInput_RU, userInput_AR, userInput_HE, manual
} from '../utilities/assistButtonUtilities';


//global variables
var languageObject = {};
var regExOfCommands = {};
var assistantMessages = {};
var userInput = {};
var automaticRead;
var VG;
var chosenLanguage;

//get automatic reading status
export const getAutoRead = () => {
    return automaticRead;
};

//get language
export const getLanguage = () => {
    switch (chosenLanguage) {
        case "English":
            regExOfCommands = regExOfCommands_EN;
            assistantMessages = assistantMessages_EN;
            userInput = userInput_EN;
            break;
        case "Russian":
            regExOfCommands = regExOfCommands_RU;
            assistantMessages = assistantMessages_RU;
            userInput = userInput_RU;
            break;
        case "Arabic":
            regExOfCommands = regExOfCommands_AR;
            assistantMessages = assistantMessages_AR;
            userInput = userInput_AR;
            break;
        case "Hebrew":
            regExOfCommands = regExOfCommands_HE;
            assistantMessages = assistantMessages_HE;
            userInput = userInput_HE;
            break;
        default:
            regExOfCommands = regExOfCommands_EN;
            assistantMessages = assistantMessages_EN;
            userInput = userInput_EN;
            break;
    }
    languageObject = { regExOfCommands, assistantMessages, userInput };
    return languageObject;
}

//get voice gender 
export const getVoiceGender = () => {
    
    let voiceGender;

    switch(languageObject.userInput){
            
        case userInput_EN:
        case userInput_HE:
            if (VG === "Women") {
                voiceGender = 'en-us-x-sfg-local';
            }
            else if (VG === "Man") {
                voiceGender = 'en-us-x-tpd-local';
            }
            break;
        case userInput_RU:
            if (VG === "Women") {
                voiceGender = 'ru-ru-x-ruf-local';
            }
            else if (VG === "Man") {
                voiceGender = 'ru-ru-x-rud-network';
            }
            break; 
        case userInput_AR:
            if (VG === "Women") {
                voiceGender = 'ar-xa-x-ard-local';
            }
            else if (VG === "Man") {
                voiceGender = 'ar-xa-x-ard-local';
            }
            break;            
        default:
            if (VG === "Women") {
                voiceGender = 'en-us-x-sfg-local';
            }
            else if (VG === "Man") {
                voiceGender = 'en-us-x-tpd-local';
            }
            break;
    }
    return voiceGender;
};

//Settings screen, holds the features and the manual of the application
const SettingsScreen = ({ navigation }) => {

    const [autoRead, setAutoRead] = useState(automaticRead);
    const [voiceGender, setVoiceGender] = useState(VG);
    const [language, setLanguage] = useState(chosenLanguage);
    const [isManualOn, setIsManualOn] = useState(false);

    automaticRead = autoRead;
    VG = voiceGender;
    chosenLanguage = language;

    //manual animation
    const toggleManual = () => {
        setIsManualOn(!isManualOn);
    }

    return (
        <LinearGradient
            colors={['#2b5876', '#4e4376']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <Animatable.View animation="fadeInDown" duration={1200}>
                <SettingsList.Header headerStyle={{ marginTop: -5 }} />
                <SettingsList backgroundColor='transparent' borderColor='transparent' defaultItemSize={50}>
                    <SettingsList.Item
                        hasNavArrow={false}
                        title='Settings'
                        titleStyle={{ color: '#3ad9bf', marginBottom: 10, fontWeight: '500', fontSize: 20, alignSelf: 'flex-start', paddingLeft: 5 }}
                        itemWidth={50}
                        borderHide={'Both'}
                    />
                    <View style={styles.row_view}>
                    <View style={styles.setting_view}>
                            <Switch
                                value={autoRead}
                                onValueChange={(value) => setAutoRead(value)}
                                trackColor={{ false: "grey", true: "#53f74b" }}
                            />
                        </View>
                        <View style={styles.title_icon_view}>
                            <Text style={styles.text_style}>Automatic read</Text>
                            <MaterialCommunityIcons style={styles.iconStyle} name="read" size={24} color='#009688' />
                        </View>

                    </View>
                    <View style={styles.row_view} >
                    <View style={styles.setting_view}>
                            <Picker
                                dropdownIconColor= 'white'
                                selectedValue={voiceGender}
                                style={styles.dropDown}
                                onValueChange={(itemValue) => { setVoiceGender(itemValue) }} 
                            >
                                <Picker.Item label="Woman" value={"Women"} />
                                <Picker.Item label="Man" value={"Man"} />
                            </Picker>
                        </View>
                        <View style={styles.title_icon_view}>
                            <Text style={styles.text_style}>Voice Gender</Text>
                            {voiceGender === "Man"
                                ?
                                <MaterialCommunityIcons style={styles.iconStyle} name="gender-male" />
                                :
                                <MaterialCommunityIcons style={styles.iconStyle} name="gender-female" />
                            }
                        </View>

                    </View>
                    <View style={styles.row_view} >

                        <View style={styles.setting_view}>
                            <Picker
                                dropdownIconColor= 'white'
                                selectedValue={language}
                                style={styles.dropDown}
                                onValueChange={(itemValue) => { setLanguage(itemValue) }} 
                            >
                                <Picker.Item label="English" value={"English"} />
                                <Picker.Item label="Russian" value={"Russian"} />
                                <Picker.Item label="Arabic" value={"Arabic"} />
                                <Picker.Item label="Hebrew" value={"Hebrew"} />
                            </Picker>
                        </View>
                        <View style={styles.title_icon_view}>
                            <Text style={styles.text_style}>Language</Text>
                            <FontAwesome style={styles.iconStyle} name="language" />
                        </View>
                    </View>
                </SettingsList>
                <SettingsList.Header headerStyle={{ marginTop: -5 }} />
                <SettingsList backgroundColor='transparent' borderColor='transparent' defaultItemSize={50} >
                    <SettingsList.Item
                        hasNavArrow={false}
                        title='Manual'
                        titleStyle={{ color: '#3ad9bf', marginBottom: 10, fontWeight: '500', fontSize: 20, alignSelf: 'flex-start', paddingLeft: 5 }}
                        itemWidth={50}
                        borderHide={'Both'}
                    />
                    <TouchableOpacity onPress={() => { toggleManual() }}>
                        <View style={styles.row_view} >
                            <View style={styles.title_icon_view}>
                                <Text style={styles.text_style}>User Manual</Text>
                                <FontAwesome style={styles.iconStyle} name="list-ol" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    {isManualOn &&
                        <View>
                            <TouchableOpacity onPress={() => { navigation.navigate("ReadManual") }}>
                                <Animatable.View style={styles.row_view} animation="fadeInRight" duration={1000}>
                                    <View style={styles.title_icon_view}>
                                        <Text style={styles.text_style}>Read Manual</Text>
                                        <FontAwesome5 style={styles.iconStyle} name="glasses" />
                                    </View>
                                </Animatable.View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate("WriteManual") }}>
                                <Animatable.View style={styles.row_view} animation="fadeInRightBig" duration={1000}>

                                    <View style={styles.title_icon_view}>
                                        <Text style={styles.text_style}>Write Manual</Text>
                                        <FontAwesome style={styles.iconStyle} name="pencil" />
                                    </View>
                                </Animatable.View>
                            </TouchableOpacity>
                        </View>
                    }
                </SettingsList>
            </Animatable.View>
        </LinearGradient>

    );
}

export default SettingsScreen;
