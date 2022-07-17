import React, { useState, useEffect } from 'react';
import { View, Text, Linking, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/AuthenticationScreenStyles';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Clipboard from '@react-native-clipboard/clipboard';
import LoadingSpinner from '../components/LoadingSpinner';
import { setWhatsAppAuthentication } from '../asyncStorage/AsyncStorage';
import { io } from "socket.io-client";

const socket = io("http://10.0.0.13:3000"); //https://wa-assist.herokuapp.com/
// const socket = io("http://10.0.0.2:3000"); -- -- dev purposes
// https://alex-bord.herokuapp.com/ -- dev purposes

export const getSocket = () =>{
    return socket;
}

const AuthenticationScreen = () => {
    const [qrCode, setQrCode] = useState(null);
    const [readyToAuthenticate, setReadyToAuthenticate] = useState(false);
    const [copy, setCopy] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [instructions, setInstructions] = useState(false);
    const navigation = useNavigation();

    const toggleCopy = () => {
        setCopy(!copy);
    }
    const toggleRefresh = () => {
        setRefresh(!refresh);
    }
    const toggleInstructions = () => {
        setInstructions(!instructions);
    }

    function connectToWa() {
        setReadyToAuthenticate(false);
        socket.emit("connectToWa", true);
    }

    useEffect(() => {
        socket.on("sessionIsOn", session => {
            setQrCode(null);
            setWhatsAppAuthentication("authenticated"); 
            navigation.navigate('Home');
        });

        socket.on("QrCode", qrCode => {
            setQrCode(qrCode);
            setReadyToAuthenticate(true);
        });

        connectToWa();
    }, []);

    return (
        <LinearGradient
            colors={['#2b5876', '#4e4376']}
            style={styles.backgroundStyle}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >

            <View style={styles.header_view}>
                <Animatable.View animation="bounceIn" duration={2000}>
                    <Text style={styles.header}>Welcome!</Text>
                </Animatable.View>
                <View style={styles.subHeader_view}>
                    <Animatable.View animation="bounceInDown" onAnimationEnd={() => { toggleInstructions() }} duration={3000}>
                        <Text style={styles.text}>We need to connect to your WhatsApp.</Text>
                    </Animatable.View>
                </View>
            </View>
            {instructions &&
                <View style={styles.middle_view}>

                    <Animatable.View animation="fadeInRight" duration={800}>
                        <Text style={styles.text}>Please scan the QR Code via WhatsApp QR scanner. </Text>
                    </Animatable.View> 
                    <Animatable.View animation="fadeInLeft" duration={800}>
                        <Text style={styles.text2}>from the following link:</Text>
                    </Animatable.View>
                    {
                        readyToAuthenticate
                            ?
                            <Animatable.View style={styles.link_view} animation="flipInY" duration={1400}>
                                <Animatable.View animation="fadeInRight" duration={1400}>
                                    <TouchableOpacity onPress={() => { Linking.openURL("https://wa-assist.herokuapp.com/"); }}>
                                        <Text style={styles.text}>wa-assist.herokuapp.com</Text>
                                    </TouchableOpacity>
                                </Animatable.View>
                                {copy &&
                                    <Animatable.View animation="fadeInRight"
                                        onAnimationEnd={() => { toggleCopy() }}
                                        duration={1400}>
                                        <View style={styles.copy_message} rotate={true}>
                                            <Text style={styles.copy_text}>Link Copied</Text>
                                        </View>
                                    </Animatable.View>
                                }
                                {refresh &&
                                    <Animatable.View animation="fadeInLeft"
                                        onAnimationEnd={() => { connectToWa(); toggleRefresh(); }}
                                        duration={1400}>
                                        <View style={styles.refresh_message} rotate={true}>
                                            <Text style={styles.copy_text}>Refreshing</Text>
                                        </View>
                                    </Animatable.View>
                                }
                                <View style={{
                                    flexDirection: 'row',
                                    alignSelf: 'center',
                                }}>
                                    <Animatable.View style={{ paddingHorizontal: 10 }} animation="zoomIn" duration={1400}>
                                        <TouchableOpacity onPress={() => {
                                            Clipboard.setString('https://wa-assist.herokuapp.com/');
                                            toggleCopy();
                                        }}>
                                            <AntDesign name="copy1" style={styles.copy_icon} />
                                        </TouchableOpacity>
                                    </Animatable.View>
                                    <Animatable.View style={{ paddingHorizontal: 10 }} animation="zoomIn" duration={1400}>
                                        <TouchableOpacity onPress={() => { toggleRefresh(); }}>
                                            <FontAwesome name="refresh" style={styles.copy_icon} />
                                        </TouchableOpacity>
                                    </Animatable.View>
                                </View>
                            </Animatable.View>
                            :
                            <LoadingSpinner />
                    }
                </View>
            }
            {
                readyToAuthenticate ?
                    <View style={styles.bottom_view}>
                        <Animatable.View animation="slideInUp" duration={1400}>
                            <Image style={{ width: 200, height: 200 }} source={{ uri: qrCode }} />
                        </Animatable.View>
                    </View>
                    : true
            }
        </LinearGradient>
    );
};

export default AuthenticationScreen;
