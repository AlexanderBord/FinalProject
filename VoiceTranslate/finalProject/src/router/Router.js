import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WriteManual from '../screens/WriteManual';
import ReadManual from '../screens/ReadManual';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AuthenticationScreen from '../screens/AuthenticationScreen';

//reference to a stack navigator 
const Stack = createNativeStackNavigator();

//Program Router, receive props as a parameter from the routeInitializer screen and route the user accordingly
const Router = (props) => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={props.initialRoute}>
                <Stack.Screen
                    name="SignIn"
                    component={SignInScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Authentication"
                    component={AuthenticationScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{ title: 'Settings' }}
                />
                <Stack.Screen
                    name="WriteManual"
                    component={WriteManual}
                    options={{ title: 'Write Manual' }}
                />
                <Stack.Screen
                    name="ReadManual"
                    component={ReadManual}
                    options={{ title: 'Read Manual' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default Router;
