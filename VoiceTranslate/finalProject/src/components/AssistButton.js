import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import Voice from '@react-native-community/voice';
import Tts from 'react-native-tts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LoadingSpinner from './LoadingSpinner';
import styles from '../styles/AssistButtonStyles';
import { setWhatsAppAuthentication, getWhatsAppAuthentication } from '../asyncStorage/AsyncStorage';
import { useNavigation } from '@react-navigation/native';
import { LogBox } from 'react-native';
import { getAutoRead, getLanguage, getVoiceGender } from '../screens/SettingsScreen';
import { getSocket } from '../screens/AuthenticationScreen';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
window.navigator.userAgent = 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);

//global variables
var input = [];
var whatsAppContacts = {};
var mainAssistant = {};
var cancelUserInput = false;
var numOfMsgs;
var socket;

//main AssistButton Component, responsible for managing the main activity
const AssistButton = () => {

    const [lastAssistantSpeech, setLastAssistantSpeech] = useState(""); //holds last assistant speech was entered
    const [commandType, setCommandType] = useState(""); //holds the type of the command should start
    const [contactNumber, setContactNumber] = useState(""); //holds contact number
    const [result, setResult] = useState(""); //holds the current input
    const [isReading, setIsReading] = useState(false); //helps to synchronise the animations
    const navigation = useNavigation();

    //This is possible due to the newest version of react-native. A lot of libraries still haven't released a new version to handle these errors
    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, [])

    //get socket 
    useEffect(() => {
        socket = getSocket();
        }, []);

    //initialize language listener 
    useEffect(() => {   
        mainAssistant = getLanguage();
    }, []);

    //socket listeners 
    useEffect(() => {
        socket.on("messageReceived", message => {
            automaticRead(message);
        });

        socket.on("contactsSorted", sortedContacts => {
            acceptContacts(sortedContacts);
        });

        socket.on("msgs", messages => {
            readMessages(messages);
        });
        socket.on("loggedOut", state => { //self unlinking
            setWhatsAppAuthentication('disapproved');
            Alert.alert("It seems your WhatsApp has been unlinked, moving to authentication screen");
            navigation.navigate('Authentication');
        })
    }, []);

    //Authentication Handler
    useEffect(() => {
        async function getStorageValue() {
            authWhatsAppStatus = await getWhatsAppAuthentication();
            try {
                if (authWhatsAppStatus !== "authenticated") {
                    throw 'DisconnectedWhatsApp';
                }
            } catch (e) {
                setWhatsAppAuthentication('disapproved');
                return navigation.navigate("Authentication");
            }       
        }
        getStorageValue();
        }, []);
        
    //Voice library useEffect - defines the necessary handlers for the library
    useEffect(() => {
        Voice.onSpeechStart = onSpeechStartHandler;
        Voice.onSpeechEnd = onSpeechEndHandler;
        Voice.onSpeechResults = onSpeechResultsHandler;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    //TTS library useEffect - defines the necessary handlers for the library
    useEffect(() => {
        const startSubscription = Tts.addEventListener('tts-start', () => ttsStarted());
        const finishSubscription = Tts.addEventListener('tts-finish', () => ttsEnd());

        return () => {
            Tts.stop();
            startSubscription.remove();
            finishSubscription.remove();
        };
    }, []);

    //automatic read of messages function, receive a message to reads
    const automaticRead = (message) => {
        var automaticReading = getAutoRead();

        if (automaticReading) {
            mainAssistant = getLanguage();
            cancelUserInput = true;  
            assistantSpeak(mainAssistant.assistantMessages.received.newMessage + message.notifyName + "," +
                mainAssistant.assistantMessages.received.messageContent + message.body);
        } 
    };

    //read messages function
    const readMessages = (messages) => {
        let startingPoint;
        if (messages.length > numOfMsgs) {
            startingPoint = messages.length - numOfMsgs;
        }
        else {
            startingPoint = 0;
        }
        var messagesString = " ";
        for (let i = startingPoint; i < messages.length; i++) {
            messagesString = messagesString + "       " + messages[i].body;
        }
        cancelUserInput = true;
        assistantSpeak(messagesString);
        recognizeInputAndAnswer(mainAssistant.assistantMessages.read.approveAndContinue);
    };


    //get number of messages to read function
    const getNumOfMessages = (result) => {
        numOfMsgs = result;
        numOfMsgs = new Number(numOfMsgs);

        if (isNaN(numOfMsgs)) {
            let isNumber;
            for (let i = 0; i < input.length - 1; i++) {
                if (Number(input[i])) {
                    numOfMsgs = input[i];
                    isNumber = true;
                    numOfMsgs = new Number(numOfMsgs);
                }
            }
            if (!isNumber) { 
                cancelUserInput = true;
                assistantSpeak(mainAssistant.assistantMessages.exceptions.numOfMessages);
                return false;
            }
        }
        return true;
    };

    //store whatsApp sorted contacts function, the contacts are coming from server side and stored in a global variable
    const acceptContacts = (sortedContacts) => {
        whatsAppContacts = sortedContacts;
    };

    // VOICE LYB HANDLERS 
    const onSpeechStartHandler = (e) => {
        Tts.stop;
    };
    const onSpeechEndHandler = (e) => {
        Tts.stop;
    };
    const onSpeechResultsHandler = (e) => {
        try {
            let text = e.value[0];
            setResult(text);
            input = e.value;
        }
        catch (error) {
            return null;
        }
    };

    // TTS LYB HANDLERS 
    const ttsStarted = () => {
        setIsReading(true);
    };
    const ttsEnd = () => {
        setIsReading(false);
        if (cancelUserInput === false) {
            inputFromUser();
        }
        cancelUserInput = false;
    };


    //result useEffect - will be called every time "result" is beeing modified,
    //so every time we finish giving our input to the assistant, this useEffect will be called
    //and by checking what is the last thing the assistant toled us -
    //we will know which operation to handle next - we will do that using switch/case statement
    useEffect(() => {
        switch (lastAssistantSpeech) {
            case mainAssistant.assistantMessages.reqCommand:
                recognizeCommand();
                break;
            case mainAssistant.assistantMessages.send.reqContact:
                sendCaseRequestContact();
                break;
            case mainAssistant.assistantMessages.send.reqMessage:
                sendCaseRequestAndSendMessage();
                break;
            case mainAssistant.assistantMessages.read.reqContact:
                readCaseRequestContact();
                break;
            case mainAssistant.assistantMessages.read.reqNumOfMessages:
                readCaseRequestNumberOfMessages();
                break;
            case mainAssistant.assistantMessages.send.approveAndContinue:
            case mainAssistant.assistantMessages.read.approveAndContinue:
                handleToContinueResponse();
                break;
            default: 
                Tts.stop();
                break;
        }
    }, [result]);

    //handle the send case of request contact
    const sendCaseRequestContact = () => {
        var contactValiditySend = getContactNumber(result);
        recognizeInputAndAnswer(contactValiditySend);
    };

    //handle the send case of request and send message
    const sendCaseRequestAndSendMessage = () => {
        recognizeInputAndAnswer(mainAssistant.assistantMessages.send.approveAndContinue);
        sendMessage();
    };

    //handle the read case of request contact
    const readCaseRequestContact = () => {
        var contactValidityRead = getContactNumber(result);
        recognizeInputAndAnswer(contactValidityRead);
    };

    //handle the read case of request number of messages to read
    const readCaseRequestNumberOfMessages = () => {
        const numOfMessagesValidity = getNumOfMessages(result);       
        if (numOfMessagesValidity)
            requestMessages();
        else
            recognizeInputAndAnswer(mainAssistant.assistantMessages.read.reqNumOfMessages);
    };

    //send message to a contact function, build a message object and send it to the server to continue operation
    const sendMessage = () => {
        let message = { "contactNumber": contactNumber, "messageToSend": result };  
        socket.emit("sendMessage", message);
    };

    //request messages function, send request to server for get the current messages of the user
    const requestMessages = () => {
        socket.emit("requestMessages", contactNumber);
    };

    //get contact number function, edge cases were handled
    const getContactNumber = (currContactName) => {                                 
        var contactWasFound = findContactName(currContactName);

        if (contactWasFound) {
            if (commandType === mainAssistant.userInput.sendMessage) {
                return mainAssistant.assistantMessages.send.reqMessage;
            } else {
                return mainAssistant.assistantMessages.read.reqNumOfMessages;
            }
        }

        else {
            cancelUserInput = true;
            assistantSpeak(mainAssistant.assistantMessages.exceptions.contactNotFound);
            if (commandType === mainAssistant.userInput.sendMessage) {
                return mainAssistant.assistantMessages.send.reqContact;
            } else {
                return mainAssistant.assistantMessages.read.reqContact;
            }
        }
    };

    //find contact name function, edge cases were handled
    const findContactName = (currContactName) => {                                              
        var contactFound = false;

        for (let contact of whatsAppContacts) {
            if (contact.name.toLowerCase() === currContactName.toLowerCase()) {
                setContactNumber(contact.number);
                return true;
            }
        }

        if (!contactFound) {   // if there is not hit 100%  
            var fixedContactName = validateContactName(currContactName);
            for (let contact of whatsAppContacts) {
                var fixedContactNameToCheck = validateContactName(contact.name);
                if (fixedContactName.toLowerCase() === fixedContactNameToCheck.toLowerCase()) {
                    setContactNumber(contact.number);
                    return true;
                }
            }
        }
        return contactFound;
    };

    //validation of the contact name function
    const validateContactName = (currContactName) => {
        var splittedContactName = currContactName.split(/(\s+)/);
        var fixedContactName = currContactName;

        if (splittedContactName.length > 1) {
            let firstName = splittedContactName[0];
            let lastName = splittedContactName[2];
            let fixedLastName = lastName[0];
            fixedContactName = firstName + " " + fixedLastName;
        }
        return fixedContactName;
    };

    //handleToContinueResponse function will recognize the continue command that was just given
    //this function will initiate AND save the next message from the assitant
    const handleToContinueResponse = () => {                        
        switch (result) {                           
            case mainAssistant.userInput.yes:
                recognizeInputAndAnswer(mainAssistant.assistantMessages.reqCommand);
                break;
            default: 
                assistantSpeak(mainAssistant.assistantMessages.notDetected); 
                setResult('');
                break;
        }
    };

    //validate input function, compare the input to the regular expression 
    //if there is a match will update the command to fixedCommand and return it to "recognize command"
    const validateInput = () => {

        let fixedCommand;
        for (let cmd of input) {
            if (cmd.toLowerCase().match(mainAssistant.regExOfCommands.patternOfReadMessage)) {                        
                fixedCommand = cmd.toLowerCase().match(mainAssistant.regExOfCommands.patternOfReadMessage);
                break;
            }
            else if (cmd.toLowerCase().match(mainAssistant.regExOfCommands.patternOfSendMessage)) {
                fixedCommand = cmd.toLowerCase().match(mainAssistant.regExOfCommands.patternOfSendMessage);
                break;
            }
            else {
                fixedCommand = undefined;
            }
        }
        return fixedCommand;
    };


    //recognizeCommand function will recognize the command that was just given
    //this function will initiate and save the next message from the assitant
    const recognizeCommand = () => {

        let fixedCommand = validateInput();
        let finalCommand = fixedCommand + mainAssistant.userInput.message;

        switch (finalCommand) {
            case mainAssistant.userInput.sendMessagePartial:
                setCommandType(mainAssistant.userInput.sendMessage);
                recognizeInputAndAnswer(mainAssistant.assistantMessages.send.reqContact);              
                break;
            case mainAssistant.userInput.readMessagePartial:
                setCommandType(mainAssistant.userInput.readMessage);
                recognizeInputAndAnswer(mainAssistant.assistantMessages.read.reqContact);
                break;
            default:                                                                                                                  
                assistantSpeak(mainAssistant.assistantMessages.notDetected);                                                                   
                break;
        }
    };

    //generic function to handle the communication between user and the assistant
    //this function will set the input that the user just entered to the rightful state
    //and than will initiate the next command according to the process
    const recognizeInputAndAnswer = (answer) => {
        assistantSpeak(answer);
        setLastAssistantSpeech(answer);
    };

    //inputFromUser function will be called each time we receive voice input from the user
    const inputFromUser = async () => {
       await Voice.start(mainAssistant.userInput.languageCode);
    };

    //assistantSpeak function will be called every time we want the assistant to say something
    const assistantSpeak = (speech) => {
        try {
            if (mainAssistant.userInput.languageCode === "he-IL") { //there is not support 4 hebrew tts then we use en tts, ordinary case.
                Tts.setDefaultLanguage("en-US");
            }
            else {
                Tts.setDefaultLanguage(mainAssistant.userInput.languageCode);
            }
            if (getVoiceGender() !== undefined) {
                Tts.setDefaultVoice(getVoiceGender());
            }
            Tts.speak(speech);
        } catch (error) {
            return null;
        }
    };

    //handleScreenPress function will handle the press on the screen to continue operation
    const handleScreenPress = () => {
        cancelUserInput = false;
        mainAssistant = getLanguage();
        setIsReading(true);
        recognizeInputAndAnswer(mainAssistant.assistantMessages.reqCommand);
    }

    return (
        <TouchableOpacity onPress={() => handleScreenPress()}>
            <View style={styles.container}>
                <View style={styles.assistIconContainer}>
                    {isReading
                        ?
                        <LoadingSpinner />
                        :
                        <LinearGradient
                            colors={['#00FFFF','#17C8FF','#329BFF','#4C64FF','#6536FF','#8000FF',]}
                            start={{ x: 0.0, y: 1.0 }}
                            end={{ x: 1.0, y: 1.0 }}
                            style={{ width: 220, height: 220, borderRadius: 200, padding: 5, overflow: 'hidden', }}>
                            <View
                                style={{ flex: 1, borderRadius: 100, backgroundColor: 'rgba(52, 52, 52, 0.8)', alignItems: 'center', justifyContent: 'center', }}>
                                <Animatable.View animation="jello" duration={2500} >
                                    <FontAwesome name="microphone" style={styles.assistIcon} />
                                </Animatable.View>
                            </View>
                    </LinearGradient>
                    }
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default AssistButton;


