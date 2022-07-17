
import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    header: {
        fontSize: 50,
        color: '#ee9ca7',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 15,
        textAlign: 'center'
    },
    text: {
        flexDirection: 'row',
        justifyContent: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    text2: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    backgroundStyle: {
        flex: 1,
        alignItems: 'center',

    },
    main_view: {
    },
    header_view: {
        marginHorizontal: 20,
    },
    subHeader_view: {
        paddingVertical: 25
    },
    middle_view: {
        Top: 0,
        marginHorizontal: 20,
    },
    bottom_view: {
        paddingVertical: 25,
        marginHorizontal: 30,
        alignItems: 'center',
    },
    link_view: {
        marginTop: 30,
        borderRadius: 20,
        borderColor: '#53f74b',
        borderWidth: 3,
        padding: 5,
    },
    link_text: {        
        fontSize: 25,
        fontWeight: 'bold',
        color: '#53f74b',
        textAlign: 'center'
    },
    copy_text: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center'
    },
    copy_icon: {
        fontSize: 30,
        color: 'white',
        alignSelf: 'center',
        paddingTop: 10
    },
    whatsApp_icon: {
        fontSize: 40,
        color: '#53f74b',
        alignSelf: 'center',
        padding: 10
    },
    copy_message: {
        borderRadius: 20,
        borderColor: 'white',
        backgroundColor: '#4e4376',
        borderWidth: 2,
        padding: 10,
        alignItems: 'center',
        alignSelf: 'flex-start',
        position: 'absolute',
    },
    refresh_message: {
        borderRadius: 20,
        borderColor: 'white',
        backgroundColor: '#4e4376',
        borderWidth: 2,
        padding: 10,
        alignItems: 'center',
        alignSelf: 'flex-end',
        position: 'absolute',
    },
    view3: {
        position: 'absolute',
        bottom: 10,
    },
});