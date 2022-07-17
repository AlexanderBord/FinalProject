import Storage from '@react-native-async-storage/async-storage';

//get value async function, returns the current status of 'LoggedIn' key
export const getValue = async () => {
    try {
        var value = await Storage.getItem('LoggedIn');
    } catch (e) {
        return null;
    }
    return value;
}

//set value async function, set the current status of 'LoggedIn' key
export const setLoggedIn = async (value) => {
    try {
        await Storage.setItem('LoggedIn', value)
    } catch (e) {
        console.log("setLogin Exception" + e);
        return null;
    }
}

//get whatsApp authentication status, returns the current status of 'whatsApp' key
export const getWhatsAppAuthentication = async () => {
    var value = await Storage.getItem('whatsApp');
    return value;
}

//set whatsApp authentication status, set the current status of 'whatsApp' key
export const setWhatsAppAuthentication = async (value) => {
    try {
        await Storage.setItem('whatsApp', value)
    } catch (e) {
        return null;
    }
}
