import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    imageStyle: {
        marginLeft: 15,
        marginRight: 20,
        alignSelf: 'center',
        width: 20,
        height: 24,
        justifyContent: 'center',
    },
    iconStyle: {
        color: '#3ad9bf',
        fontSize: 30,
        paddingLeft: 10,
        paddingVertical: 7,
    },
    row_view: {
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 1,
        flexDirection: 'row',
    },
    title_icon_view: {
        flex: 7, 
    },
    setting_view: {
        alignSelf: 'center',
        flex: 10,
    },
    dropDown: {
        color: 'white',
        alignItems: 'center',
    },
    text_style: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
        marginTop: 5,
        marginLeft: 5,
        paddingLeft: 5,
    },
    titleStyle: {
        color: '#3ad9bf',
        marginBottom: 10,
        fontWeight: '500',
        alignSelf: 'flex-start',

    }
});