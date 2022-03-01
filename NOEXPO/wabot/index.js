//const wa = require('@open-wa/wa-automate');

const { create, ev } = require('@open-wa/wa-automate');
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require('socket.io')(server);
const port = 3000;
server.listen(port, () => console.log("server running on port: " + port));


var waClient = {};

ev.on('qr.**', async qrcode => {
  console.log("emit image");
  io.emit("QrCode", qrcode);
}) 

ev.on('sessionData.**', async (sessionData, sessionId) => {
  io.emit("sessionIsOn", sessionData);

  //use session data to know when to start app useabillity
});

io.on("connection", socket => {

  console.log("a user connected :D");
  // connectToWhatsApp();
  
  //listener to event named "sendMessage", receive contact name + id (number)
  socket.on ("sendMessage", async  message => {
    const state = await waClient.sendText(message.contactNumber, message.messageToSend);
    console.log("STATE " + state);
  })

  socket.on ("requestMessages", async  contactNumber => {

    //get all messages from the contact
    const msgs = await waClient.getAllMessagesInChat(contactNumber, false, false);
    io.emit("msgs", msgs);
  })

  socket.on ("connectToWa", async  status => {
      connectToWhatsApp();
  })

})




  //-----------------------
  // wa.create({
  //   sessionId: "x",
  //   multiDevice: true, //required to enable multiDevice support
  //   authTimeout: 60, //wait only 60 seconds to get a connection with the host account device
  //   blockCrashLogs: true,
  //   disableSpins: true,
  //   headless: true,
  //   hostNotificationLang: 'PT_BR',
  //   logConsole: false,
  //   popup: true,
  //   qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
  // }).then (client => start(client));
  
  // async function start(client) {
  
  //   console.log("START");
  
  //   const chats = await client.getAllChatsWithMessages(false);
  
  //   // console.log("CHATS  " + chats);
  
  //   client.onMessage(async message => {
  
  //     const contacts = await client.getAllContacts();
  //     // console.log("CONTACTS  " + contacts);
    
  //     console.log("MSG " + message.body);
  //     console.log("MSG CONTENT " + message);
  //   });
  // }



//});

//connectToWhatsApp();
// console.log("before emit");
// io.emit("msg", "hi");
// console.log("after emit");




function connectToWhatsApp(){ 

  console.log("Connecting To WhatsApp...");

  async function start(client) {

    waClient = client;

    // const chats = await client.getAllChatsWithMessages(false);

    const contacts = await client.getAllContacts();
    const contactsSorted = [];

    for(let contact of contacts){
      if(contact.name !== undefined){
        contactsSorted.push({"name" : contact.name, "number" : contact.id })
      }
    }
    //io.emit("chats", chats);

    // client.onMessage(async message => {
    //     console.log("MSG " + message.body);
    //     console.log("MSG CONTENT " + message);
    // });

    io.emit("contactsSorted", contactsSorted);

}

create().then(start);
};

//}
