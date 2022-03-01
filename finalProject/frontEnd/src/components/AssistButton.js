import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import Voice from '@react-native-community/voice';
import Tts from 'react-native-tts';



import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);


//socket imports-------------------
window.navigator.userAgent = 'react-native';
import { io } from "socket.io-client";

const socket = io("http://10.0.0.2:3000"); // fix it to connect to device IP 
var numOfMsgs;

//--------------------
//***************************** */
//need to define longer time for user input + handle exception => request to repeat if command isnt validated
//***************************** */
//***************************** */


const AssistButton = () => {
    //object for saving all the messages that we will want the assistant to read

    

    const assitantMessages =
        { "reqCommand" : "what would you like to do?",
          "isDone" : "ok, press on the assist button if you want to do anything else",
            "send" : {
                "reqContact" : "who do you want to send a message to?",
                "reqMessage" : "what would you like to send?",
                "approveAndContinue" : "sending your message, say ken if u wish to do anything else, say lo if your done",
            },
            "read" :{
                "reqContact" : "who do you want to read a message from?",
                "reqNumOfMessages" : "how many messages would you like to read?",
                "approveAndContinue" : "your messages have been read, say ken if u wish to do anything else, say lo if your done",
            },
        };

    const regExOfCommands = 
        {
            patternOfReadMessage : /^קרא/,
            patternOfSendMessage : /^שלח/,
        }
        
    //HOOKS---------------------------------------
    const[lastAssistantSpeech, setLastAssistantSpeech] = useState(""); //state for saving the last message the assistant read to us
    //states for saving user input---------
    const [commandType, setCommandType] = useState("");
    const [contactName, setContactName] = useState("");
    const [messageToSend, setMessageToSend] = useState("");
    const [numOfMessages, setNumOfMessages] = useState("");
    const [toContinue, setToContinue] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    //--------------------------------------
    const [result, setResult] = useState(""); //current user input
    const [isLoading, setLoading] = useState(false);//state to see if input is beeing entered (maybe its irrelevant!!!!!!!!!!!!!!!!)
    const [ttsStatus,setTtsStatus] = useState("initiliazing");//state for saving the current tts state(maybe its irrelevant!!!!!!!!!!!!!!!!)
    //-------------------------------------------

    const[contacts , setContacts] = useState({});

    const [qrCode, setQrCode] = useState(null);
    const [session, setSession] = useState(false);
    const [messages, setMessages] = useState({});

    useEffect(() => {

        socket.on("QrCode", qrCode => {
            setQrCode(qrCode);
        });

        socket.on("contactsSorted", sortedContacts => {
            acceptContacts(sortedContacts);
        });

        socket.on("sessionIsOn", session => {
            console.log("session is on ");
            setSession(true);
            //now the backend is ready, we can start work = use data.
        });

        socket.on("msgs", messages => {
            readMessages(messages);
        });
    }, []);

    // useEffect( () => {

    //     console.log("in useEffect of numOfMessages");
    //     console.log("in get number of messages AFTER CHANGE" + numOfMessages);

    // }, [numOfMessages])

    const readMessages = (messages) =>{

        setMessages(messages);

        let numberOfMessagesAsInt = new Number(numOfMsgs);

        for(let i = 0; i < numberOfMessagesAsInt ; i++){ 
            console.log("message " + i + " " + messages[i].body);
            assistantSpeak(messages[i].body);
        }
    }

    const getNumOfMessages = (result) => {
        numOfMsgs = result;
    };


    const acceptContacts = (sortedContacts) =>{
        setContacts(sortedContacts);
    };

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
        Tts.addEventListener('tts-start', () => ttsStarted());
        Tts.addEventListener('tts-finish', () => ttsEnd());
       // Tts.addEventListener('tts-cancel', (event) => console.log("cancel", event));
        return () => {
            Tts.destroy().then(Tts.removeAllListeners);          //need to check about this destructor <- current version is wrong
        };
    }, []);

    // VOICE LYB HANDLERS ----------------------------
    const onSpeechStartHandler = (e) => {
        console.log("start handler==>>>", e);
    }; 
    const onSpeechEndHandler = (e) => {
        setLoading(false);
        console.log("stop handler", e);
    };
    const onSpeechResultsHandler = (e) => {
        let text = e.value[0];
        setResult(text);
        console.log("speech result handler", e);
    };
    //------------------------------------------------

    // TTS LYB HANDLERS ----------------------------
    const ttsStarted = () => {
        setTtsStatus("started");
    };
    const ttsEnd = () => {
        if (toContinue !== "לא"){        //CONDITION NOT VALID, NEED TO FIGURE IT OUT -> 
            setTtsStatus("finished");   //WILL KEEP ON WAITING FOR INPUT BECAUSE OF THAT
            inputFromUser();
        }else{
            setToContinue("");
        }
    };
    //------------------------------------------------

    //result useEffect - will be called every time "result" is beeing modified,
    //so every time we finish giving our input to the assistant, this useEffect will be called
    //and by checking what is the last thing the assistant toled us -
    //we will know which operation to handle next - we will do that using switch/case statement
    useEffect(() => {
        switch (lastAssistantSpeech){
            case assitantMessages.reqCommand:

                recognizeCommand();
                break;
            case assitantMessages.send.reqContact:

                recognizeInputAndAnswer(setContactName, result, assitantMessages.send.reqMessage);
                getContactNumber(result);
                break;
            case assitantMessages.send.reqMessage:

                recognizeInputAndAnswer(setMessageToSend, result, assitantMessages.send.approveAndContinue);       
                sendMessage();
                break;
            case assitantMessages.read.reqContact:

                recognizeInputAndAnswer(setContactName, result, assitantMessages.read.reqNumOfMessages);
                getContactNumber(result);
                break;
            case assitantMessages.read.reqNumOfMessages:   

                recognizeInputAndAnswer(setNumOfMessages, result, assitantMessages.read.approveAndContinue);
                getNumOfMessages(result);
                requestMessages();

                break;
            case assitantMessages.send.approveAndContinue:

                console.log("approve send");
                handleToContinueResponse();
                break;
            case assitantMessages.read.approveAndContinue:

                console.log("approve read");
                // handleToContinueResponse();
                break;
            case assitantMessages.isDone:

                console.log("inside done CASE, breaking")
                break;
            default: //handle exception
                break;
        }
    }, [result]);

    const sendMessage = () => {

        let message = {"contactNumber" : contactNumber, "messageToSend" : result};  //result because message to send isnt updated;
        console.log(message.contactNumber + " + " + result);
        socket.emit("sendMessage", message);

        // if(message.contactNumber && message.messageToSend){
        //     assistantSpeak("Message was sent successfully");
        // }
        // else{
        //     console.log("error with sending message") // 4 tests
        // }
    };

    const requestMessages = () => {

        socket.emit("requestMessages", contactNumber);
        // setNumOfMessages(result);

        console.log("in requestMessages " + numOfMessages);
        console.log(contactNumber + " + " + result);
    };

    const getContactNumber = (currContactName) => {
        for (let contact of contacts){
            if (contact.name === currContactName){
                setContactNumber(contact.number);
            }
        }
    };

    //this function will recognize the continue command that was just given
    //this function will initiate AND save the next message from the assitant
    const handleToContinueResponse = () =>{

        console.log("IN handleToContinueResponse " + result );

        setToContinue(result);                          //will need to validate command here
        switch (result){                            //switch (toContinue){ was same problem with state update before the condition(switch)
            case "כן":
                recognizeInputAndAnswer(setLoading, true, assitantMessages.reqCommand);
                break;
            case "לא":      //const
                recognizeInputAndAnswer(setLoading, false, assitantMessages.isDone);
                break;
            default: //handle exception
                assistantSpeak("Command not detected Please try again")
                break;
        }
    };

    //validate input function, compare the input to the regular expression 
    //if there is a match will update the command to fixedCommand and return it to "recognize command"
    const validateInput = () => {

        let fixedCommand; 

        if( result.match(regExOfCommands.patternOfReadMessage) ){
            fixedCommand = result.match(regExOfCommands.patternOfReadMessage);
        }
        else if(result.match(regExOfCommands.patternOfSendMessage)){
            fixedCommand = result.match(regExOfCommands.patternOfSendMessage);
        }
        else{
            fixedCommand = undefined;
        }

        return fixedCommand;
    }

    //this function will recognize the command that was just given
    //this function will initiate AND save the next message from the assitant
    const recognizeCommand = () => {

        let fixedCommand = validateInput();
        let temp = fixedCommand + " הודעה";

        switch (temp){
            case "שלח הודעה":
                recognizeInputAndAnswer(setCommandType, "שלח הודעה", assitantMessages.send.reqContact); //const
                break;
            case "קרא הודעה":
                recognizeInputAndAnswer(setCommandType, "קרא הודעה", assitantMessages.read.reqContact);
                break;
            default://handle command type isnt recognized
                assistantSpeak("Command not detected Please try again")
                break;
        }
    };

    //generic function to handle the communication between user and the assistant
    //this function will set the input that the user just entered to the right state
    //and than will call the next command according to the process
    const recognizeInputAndAnswer = (setter, item, answer) => {
        setter(item);
        assistantSpeak(answer);
        setLastAssistantSpeech(answer);
    };

    //this function will be called each time we receive voice input from the user
    const inputFromUser = async () =>{
        await Voice.start('he-IL', {
            EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS : 10000  // EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: 10000    
            });
    };

    //this function will be called every time we want the assistant to say something
    const assistantSpeak = async (string) => {
        try {
            Tts.speak(string);
        } catch (error) {
            console.log("error raised", error);
        }
    };

    function connectToWa(){
        console.log("connectToWa");
        socket.emit("connectToWa", true);
    }

    return (
        <View style={styles.container}>
            <SafeAreaView>
                
                <Text style={styles.headingText}>Speech Recoginition</Text>
                <View style={styles.textInputStyle}>
                {isLoading ? <ActivityIndicator size="large" color="red" />
                        :
                        <TouchableOpacity
                            onPress={ () => recognizeInputAndAnswer(setLoading, true, assitantMessages.reqCommand)}
                        >
                            <Image
                                source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png' }}
                                style={{ width: 25, height: 25 }}
                            />
                        </TouchableOpacity>}
                    <Text>Command: {commandType}</Text>
                    <Text>Contact: {contactName}</Text>
                    <Text>Message(on send): {messageToSend}</Text>
                    <Text>Num Of Messages(on read): {numOfMessages}</Text>
                    <Text>To Continue: {toContinue}</Text>   
                    <Button title="connect to whatsApp" onPress={connectToWa}/>           
                </View>
            </SafeAreaView>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24
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
        borderRadius: 20,
        paddingHorizontal: 16,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 2,
        shadowOpacity: 0.4
    }
});
export default AssistButton;


    // const stopRecording = async () => {
    //     try {
    //         await Voice.stop();
    //     } catch (error) {
    //         console.log("error raised", error);
    //     }
    // };