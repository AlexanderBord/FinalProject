import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { withNavigation } from 'react-navigation';

const ManualContainer = ({ navigation }) => {

    const [writeModalVisible, setWriteModal] = useState(false);
    const [readModalVisible, setReadModal] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <Text style={styles.headerText}>User Manual</Text>
            </View>
            <View style={styles.touchableView}>
                <Modal                          //Modal -------------------------------------------
                    animationType="slide"
                    transparent={true}
                    visible={writeModalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!writeModalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>This is The Write Message Manual!</Text>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setWriteModal(!writeModalVisible)}
                            >
                                <Text style={styles.textStyle}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <TouchableOpacity onPress={() => setWriteModal(true)}>
                    <Text style={styles.touchableText}>Write Messages</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.touchableView}>


                <Modal                          //Modal -------------------------------------------
                    animationType="slide"
                    transparent={true}
                    visible={readModalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!readModalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>This is The Read Message Manual!</Text>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setReadModal(!readModalVisible)}
                            >
                                <Text style={styles.textStyle}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>


                <TouchableOpacity onPress={() => setReadModal(true)}>
                    <Text style={styles.touchableText}>Read Messages</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({

    centeredView: {     //Modal -------------------------------------------
        flex: 1,
        marginTop: 22
    },
    modalView: {
        flex: 1,
        justifyContent: 'space-around',
        marginHorizontal: 10,
        marginVertical: 150,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }, button: {
        borderRadius: 20,
        padding: 15,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#0066CC",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
    },
    modalText: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center"
    },


    //Modal -------------------------------------------


    container: {
        marginHorizontal: 80,
        marginTop: 40,
        marginBottom: 70,
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        borderWidth: 4,
        borderColor: '#ccd1d1',
        alignItems: 'stretch'
    },
    headerView: {
        backgroundColor: '#0066CC',
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccd1d1'
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'white',
        marginTop: 3
    },
    touchableView: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccd1d1'
    },
    touchableText: {
        fontSize: 22,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 10
    }



});
export default withNavigation(ManualContainer);
