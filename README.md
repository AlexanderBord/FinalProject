FinalProject - Voice Translate
==============================
An Android app that allows you to send and read messages using voice commands.

## Setup

### Server side -

Open first console in the main path `VoiceTranslate \ server` and install node modules with the command 
- `npm install` 
- then, enter the command `node index.js` to run the server.



### Client side -

Open a second console in the main path `VoiceTranslate \ finalProject` and install node modules with the command
- `npm install `
- then, enter the command `npx react-native start` to run the metro.

Open a third console in the main path `VoiceTranslate \ finalProject`
and enter the command 
- `npx react-native run-android` to run the program.



### Connection between server side and client -

To connect to a socket for communication between the server side and the client, enter an IPV4 address of the device, in line 15, in the following file - 
`VoiceTranslate \ finalProject \ src \ screens \ AuthenticationScreen.js`

In the next command 
- `const socket = io ("http: // HERE: 3000");`


## Folder structure

### Client Side (FinalProject)

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


### Server Side (server)

- `dist`: folder that holds the app site design.
- `index.js`:responsible for the messaging app and the app website.


------------------------------------------
![ezgif com-gif-maker](https://user-images.githubusercontent.com/74188589/179405846-026f1b44-ffca-43c1-9b57-1bc2a582c875.gif)
