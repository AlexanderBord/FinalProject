Final Project - Voice Translate
==============================
An Android app that allows you to send and read messages using voice commands.

## Built With

- Text to speech : `react-native-tts`

- Speech to text : `react-native-voice`

 * <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
 * <img src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black"/>
 * <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white"/>
 * <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white"/>
 * <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
 * <img src="https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white"/>    
 * <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/> 
 * <img src="https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white"/>
    
    
## Installation

The program has a server side and a client side so we will need to perform separate installations.

### Back End 

Open first console in the main path `VoiceTranslate \ server` and install node modules with the command 
- `npm install` 
- then, enter the command `node index.js` to run the server.

### Front End 

Open a second console in the main path `VoiceTranslate \ finalProject` and install node modules with the command
- `npm install `
- then, enter the command `npx react-native start` to run the metro.

Open a third console in the main path `VoiceTranslate \ finalProject`
and enter the command 
- `npx react-native run-android` to run the program.

### Communication between back end and front end

To connect to a socket for communication between the server side and the client, enter an IPV4 address of the device, in line 15, in the following file - 
`VoiceTranslate \ finalProject \ src \ screens \ AuthenticationScreen.js`

In the next command 
- `const socket = io ("http: // HERE: 3000");`


## Folder structure

### Front End (FinalProject)

- `src`
  - `asyncStorage`
  - `components`
    - `AssistButton.js`: main component, responsible for managing the main activity.
    - `FloatingButton.js`: component inside the home screen, used to display the settings and a logout button.
    - `LoadingSpinner.js`: cComponent responsible for the rotating spinner to display a user indication to the TTS output.
    - `SoundWave.js`: Wave animation component, will turn on when every time the TTS will stop (indication use).
  - `dataBase`:
      - `FireBase.js`: component responsible for the fireBase database.
  - `images`
  - `router`
    - `RouterInitializer.js`: responsible for booting the router using props and asynchronous storage.
    - `Router.js`: receive props as a parameter from the routeInitializer screen and route the user accordingly.
  - `screens`
      - `AuthenticationScreen.js`: responsible for linking the user to the messaging app.
      - `HomeScreen.js`: holds the following components - AssistButton and FloatingButton.
      - `ReadManual.js`: responsible for displaying the application manual in case of reading a message.
      - `WriteManual.js`: responsible for displaying the application manual in case of sending a message.
      - `SettingsScreen.js`: holds the features and the manual of the application.
      - `SignIn.js`: responsible for the user entering the application, works in front of the database.
      - `SignUp.js`: responsible for registering the user for the application using the database.
  - `styles`
  - `utilities`
    - `assistButtonUtilities.js`: contains Voice Assistant vocabulary, regular expressions, and user input comparison commands.


### Back End (server)

- `dist`: folder that holds the app site design.
- `index.js`:responsible for the messaging app and the app website.


------------------------------------------
![ezgif com-gif-maker](https://user-images.githubusercontent.com/74188589/179405846-026f1b44-ffca-43c1-9b57-1bc2a582c875.gif)
