import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: '100%',
    },
    headingText: {
        alignSelf: 'center',
        marginVertical: 26,
        fontWeight: 'bold',
        fontSize: 26
    },
    textInputStyle: {
        justifyContent: 'space-around',
        backgroundColor: 'white',
        height: 200,
        alignSelf: 'center',
        width: 300,
        marginVertical: 20,
        borderRadius: 20,
        paddingHorizontal: 16,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 2,
        shadowOpacity: 0.4
    },
    assistIconContainer: {
       
        alignSelf: 'center'
    },
    assistIcon: {
        fontSize: 150,
        color: "white",
        alignSelf: 'center'
    },
    buttonStyle: {
        color: '#8F46B3'
    },
    view3: {
        flex: 1,
        position: 'absolute', 
        bottom: 0, 
        width: 200,
        alignSelf: 'flex-end' 
    },
    popUp: {
        borderRadius: 20,
        borderColor: 'white',
        backgroundColor: '#4e4376',
        borderWidth: 2,
        padding: 10,
        alignItems: 'center',
        alignSelf: 'flex-end',
        position: 'absolute',
    },
    popUpText: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center'
    },
});