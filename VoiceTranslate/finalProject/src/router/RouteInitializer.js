import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingSpinner from '../components/LoadingSpinner';
import Router from './Router';


const RouteInitializer = () => {
    const [initialized, setInitialized] = useState(false)
    const [initialRoute, setInitialRoute] = useState('SignIn')

    useEffect(() => {
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
