import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    header: {
        color: 'black',
        fontSize: 30,

    },
    backgroundStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    settingsIcon: {
        fontSize: 50,
        color: "black",
        alignSelf: 'flex-end',
        marginHorizontal: 10,
    },
    assistIcon: {
        fontSize: 30,
        color: "black",
    },
    text: {
        color: '#0066CC',
        fontWeight: '900',
        fontSize: 15,
    },
    topContainer: {
        height: 70,
        flexDirection: 'column',
    },
    logOut: {
        marginTop: 10,
        alignSelf: 'flex-end',
        position: 'absolute',
        fontSize: 20,
        color: 'black',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: '#0066CC',
    },
    settings: {
        marginTop: 10,
        alignSelf: 'flex-start',
        position: 'absolute',
        fontSize: 20,
        color: 'black',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: '#0066CC',
    },
});