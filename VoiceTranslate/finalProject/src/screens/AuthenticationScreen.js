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

//refernce to a socket, apply your IPV4 address for a server side connection 
const socket = io("http://HERE:3000"); // Application Site for production - https://wa-assist.herokuapp.com/  

//returns reference to a socket
export const getSocket = () =>{
    return socket;
}

//AuthenticationScreen , responsible for linking the user to the WhatsApp app
const AuthenticationScreen = () => {
    const [qrCode, setQrCode] = useState(null);
    const [readyToAuthenticate, setReadyToAuthenticate] = useState(false);
    const [copy, setCopy] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [instructions, setInstructions] = useState(false);
    const navigation = useNavigation();

    //copy button animation
    const toggleCopy = () => {
        setCopy(!copy);
    }
    //refresh button animation
    const toggleRefresh = () => {
        setRefresh(!refresh);
    }
    //instructions animation
    const toggleInstructions = () => {
        setInstructions(!instructions);
    }

    //Sends connection request to WhatsApp via socket
    function connectToWa() {
        setReadyToAuthenticate(false);
        socket.emit("connectToWa", true);
    }
    //main listener to a session and qr events
    useEffect(() => {
        
        //when session event got received, it will navigate the user to a home screen
        socket.on("sessionIsOn", session => {
            setQrCode(null);
            setWhatsAppAuthentication("authenticated"); 
            navigation.navigate('Home');
        });

        //qrCode event, will turn off the qrCode image when the user will scan the qrCode 
        socket.on("QrCode", qrCode => {
            setQrCode(qrCode);
            setReadyToAuthenticate(true);
        });
        
        //connect to whatsApp function
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
