FinalProject - Voice translate
==============================
An Android app that allows you to send and read messages using voice commands.

Server side 
===========
Open first console (server side - in the main path "VoiceTranslate \ server")
and enter the command - "node index.js" to run the server.


Client side 
===========
Open a second console (client side - in the main path "VoiceTranslate \ finalProject")
 and enter the command - "npx react-native start" to run the metro.

Open a third console (client side - in the main path "VoiceTranslate \ finalProject") 
and enter the command - npx react-native run-android to run the program.

Connection between server side and client 
=========================================
To connect to a socket for communication between the server side and the client, enter an IPV4 address of the device, in line 14, in the following file - 
"VoiceTranslate \ finalProject \ src \ screens \ AuthenticationScreen.js" 

In the next command -
const socket = io ("http: // HERE: 3000");
