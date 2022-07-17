import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StatusBar, Alert,Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { writeUserInDb } from '../dataBase/FireBase';
import styles from '../styles/SignUpStyles';

//Registration screen, responsible for registering the user for the application using the database
const SignUpScreen = ({ navigation }) => {
    const [data, setData] = React.useState({
        userName: '',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        isUserNameValid: true,
        isPasswordValid: true,
        isPasswordMatch: true,
    });
    const userNameValidator = /^[a-zA-Z0-9]{3,}\S+$/;
    const passwordValidator = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]){8,}\S+$/;

    //user input handlers
    const userNameTextInputChange = (val) => {
        if (val.match(userNameValidator)) {
            setData({
                ...data,
                userName: val,
                check_textInputChange: true,
                isUserNameValid: true,
            });
        }
    }
    //userNameValidation
    const userNameValidation = (val) => {
        if (val.match(userNameValidator)) {
            setData({
                ...data,
                userName: val,
                check_textInputChange: true,
                isUserNameValid: true,
            });
        } else {
            setData({
                ...data,
                userName: val,
                check_textInputChange: false,
                isUserNameValid: false,
            });
        }
    }
    //password input handlers
    const passwordTextInputChange = (val) => {
        setData({
            ...data,
            password: val,
        });
        if (val.match(passwordValidator)) {
            setData({
                ...data,
                isPasswordValid: true,
            });
        }
    };
    //passwordValidation
    const passwordValidation = (val) => {
        if (val.match(passwordValidator)) {
            setData({
                ...data,
                password: val,
                isPasswordValid: true,
            });
        } else {
            setData({
                ...data,
                password: val,
                isPasswordValid: false,
            });
        }
    };
    //ConfirmPassword input handlers
    const confirmPasswordTextInputChange = (val) => {
        setData({
            ...data,
            confirm_password: val,
        });
        if (val.match(data.password)) {
            setData({
                ...data,
                isPasswordMatch: true,
            });
        }
    };
    //ConfirmPasswordValidation
    const confirmPasswordValidation = (val) => {
        if (val.match(data.password)) {
            setData({
                ...data,
                confirm_password: val,
                isPasswordMatch: true,
            });
        } else {
            setData({
                ...data,
                confirm_password: val,
                isPasswordMatch: false,
            });
        }
    };
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    };
    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    };
    const signUpHandle = async () => {
        if (data.userName.length === 0 || data.isUserNameValid === false) {
            Alert.alert(
                "Please enter a valid username"
            )
        } else if (data.password.length === 0 || data.confirm_password.length === 0
            || !data.isPasswordValid || !data.isPasswordMatch) {
            Alert.alert(
                "Please enter a valid and matching passwords"
            )
        } else {
            const isAdded = await writeUserInDb({ password: data.password, userName: data.userName });
            if (!isAdded) {
                Alert.alert(
                    "oops!",
                    "Username is allready taken"
                )
            } else if (isAdded) {
                navigation.goBack();
                Alert.alert(
                    "Great!",
                    "You registered successfully"
                )
            };
        }
    }

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
                style={styles.footer}
            >
                <ScrollView>
                    <Text style={styles.text_footer}>Username</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Username"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => userNameTextInputChange(val)}
                            onEndEditing={e => userNameValidation(e.nativeEvent.text)}
                        />
                        {data.check_textInputChange ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>
                    {data.isUserNameValid ? null : (
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>
                                Username must be at least 4 characters,
                                and must not include white spaces / special characters.
                            </Text>
                        </Animatable.View>
                    )}

                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Password</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Password"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => passwordTextInputChange(val)}
                            onEndEditing={e => passwordValidation(e.nativeEvent.text)}

                        />
                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    {data.isPasswordValid ? null : (
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>
                                Password must be at least 8 characters long,
                                contain at least one upper case / one lower case letter
                                and one digit.
                            </Text>
                        </Animatable.View>
                    )}

                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Confirm Password</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Confirm Your Password"
                            secureTextEntry={data.confirm_secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => confirmPasswordTextInputChange(val)}
                            onEndEditing={e => confirmPasswordValidation(e.nativeEvent.text)}

                        />
                        <TouchableOpacity
                            onPress={updateConfirmSecureTextEntry}
                        >
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    {data.isPasswordMatch ? null : (
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>
                                Passwords does not match
                            </Text>
                        </Animatable.View>
                    )}
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => { signUpHandle() }}
                        >
                            <LinearGradient
                                colors={['#2b5876', '#4e4376']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Sign Up</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={[styles.signIn, {
                                borderColor: '#4e4376',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#2b5876'
                            }]}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </LinearGradient>
    );
};

export default SignUpScreen;