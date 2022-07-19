import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingSpinner from '../components/LoadingSpinner';
import Router from './Router';

//From initializing navigation, is responsible for checking with the asynchronous storage the status of the user's link
//to the system and, accordingly, to initialize the screens required to transfer it to the appropriate screen.
const RouteInitializer = () => {
    const [initialized, setInitialized] = useState(false)
    const [initialRoute, setInitialRoute] = useState('SignIn')

    useEffect(() => {
        //Achieving the user's connection status to the system and router accordingly
        async function getStorageValue() {
            let loggedIn, whatsAppAuthentication;
            try {
                loggedIn = await AsyncStorage.getItem('LoggedIn');
                whatsAppAuthentication = await AsyncStorage.getItem('whatsApp');
            } catch (e) {
                return null;
            } finally {
                if (loggedIn === 'loggedIn') { 
                    if (whatsAppAuthentication === "authenticated") { 
                        setInitialRoute('Home');
                    } else {
                        setInitialRoute('Authentication');
                    }
                } else {
                    setInitialRoute('SignIn');
                }
                setInitialized(true)
            }
        }
        getStorageValue();
    }, []);

    return initialized
        ? <Router initialRoute={initialRoute} />
        : <LoadingSpinner />
}
export default RouteInitializer;
