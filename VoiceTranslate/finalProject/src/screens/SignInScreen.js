import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StatusBar, Alert, Image, Button } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import { checkIfUserExist } from '../dataBase/FireBase';
import { setLoggedIn } from '../asyncStorage/AsyncStorage';
import styles from '../styles/SignInStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';


//Sign In Screen, responsible for the user entering the application, works in front of the database
const SignInScreen = ({ navigation }) => {
    const [data, setData] = React.useState({
        userName: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
    const { colors } = useTheme();

    //user name text input
    const userNameTextInputChange = (val) => {
        setData({
            ...data,
            userName: val,
            check_textInputChange: true,
        });

    }
    //user name validation
    const userNameValidation = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                userName: val,
                check_textInputChange: true,
                isValidUser: true,
            });
        } else {
            setData({
                ...data,
                userName: val,
                check_textInputChange: false,
                isValidUser: false,
            });
        }
    }
    //password input handlers
    const passwordTextInputChange = (val) => {
        setData({
            ...data,
            password: val,
        });
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true,
            });
        }
    };
    //password validation
    const passwordValidation = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true,
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false,
            });
        }
    };
    //secure text upadte
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        });
    };

    //A function that manages the user's login to the application
    const loginHandle = async (userName, password) => {
        
        var whatsAppAuthentication = await AsyncStorage.getItem('whatsApp');
        
        if (data.userName.length == 0 || data.password.length == 0) {
            Alert.alert(
                'Wrong Input!',
                'Username or password field cannot be empty.',
                [{ text: 'Okay' }],
            );
            return;
        } else {
            const data = { userName: userName, password: password };
            if (await checkIfUserExist(data)) {
                setLoggedIn('loggedIn');
                if (whatsAppAuthentication === "authenticated") {
                    navigation.navigate('Home');
                } else {
                    navigation.navigate('Authentication')
                }
            } else {
                Alert.alert(
                    'oops!',
                    'cant find a match to your                    username & password',
                );
            }
        }
    };

    return (

        <LinearGradient
            colors={['#2b5876', '#4e4376']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <StatusBar backgroundColor='#2b5876' barStyle="light-content" />
            <View style={styles.header}>
                <Image style={{ alignSelf: 'center' }} source={require('../images/cover.png')} />
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[
                    styles.footer,
                    {
                        backgroundColor: colors.background,
                    },
                ]}>
                <Text
                    style={[
                        styles.text_footer,
                        {
                            color: colors.text,
                        },
                    ]}>
                    Username
                </Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color={colors.text} size={20} />
                    <TextInput
                        placeholder="Your Username"
                        placeholderTextColor="#666666"
                        style={[
                            styles.textInput,
                            {
                                color: colors.text,
                            },
                        ]}
                        autoCapitalize="none"
                        onChangeText={(val) => userNameTextInputChange(val)}
                        onEndEditing={e => userNameValidation(e.nativeEvent.text)}
                    />
                    {data.check_textInputChange ? (
                        <Animatable.View animation="bounceIn">
                            <Feather name="check-circle" color="green" size={20} />
                        </Animatable.View>
                    ) : null}
                </View>
                {data.isValidUser ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>
                            Username must be 4 characters long.
                        </Text>
                    </Animatable.View>
                )}
                <Text
                    style={[
                        styles.text_footer,
                        {
                            color: colors.text,
                            marginTop: 35,
                        },
                    ]}>
                    Password
                </Text>
                <View style={styles.action}>
                    <Feather name="lock" color={colors.text} size={20} />
                    <TextInput
                        placeholder="Your Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[
                            styles.textInput,
                            {
                                color: colors.text,
                            },
                        ]}
                        autoCapitalize="none"
                        onChangeText={(val) => passwordTextInputChange(val)}
                        onEndEditing={e => passwordValidation(e.nativeEvent.text)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {data.secureTextEntry ? (
                            <Feather name="eye-off" color="grey" size={20} />
                        ) : (
                            <Feather name="eye" color="grey" size={20} />
                        )}
                    </TouchableOpacity>
                </View>
                {data.isValidPassword ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>
                            Password must be 8 characters long.
                        </Text>
                    </Animatable.View>
                )}

                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => {
                            loginHandle(data.userName, data.password);
                        }}>
                        <LinearGradient
                            colors={['#2b5876', '#4e4376']}
                            style={styles.signIn}>
                            <Text
                                style={[
                                    styles.textSign,
                                    {
                                        color: '#fff',
                                    },
                                ]}>
                                Sign In
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}
                        style={[
                            styles.signIn,
                            {
                                borderColor: '#4e4376',
                                borderWidth: 1,
                                marginTop: 15,
                            },
                        ]}>
                        <Text
                            style={[
                                styles.textSign,
                                {
                                    color: '#2b5876',
                                },
                            ]}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>

        </LinearGradient>
    );
};
export default SignInScreen;
