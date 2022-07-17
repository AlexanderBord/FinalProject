

//Regular expressions for the accuracy of the application input
export const regExOfCommands_HE =
{
    patternOfReadMessage: /^קר/,
    patternOfSendMessage: /^של/,
};
export const regExOfCommands_EN =
{
    patternOfReadMessage: /^re/,
    patternOfSendMessage: /^se/,
};
export const regExOfCommands_RU =
{
    patternOfReadMessage: /^проч/, 
    patternOfSendMessage: /^отпр/,
};
export const regExOfCommands_AR =
{
    patternOfReadMessage: /^اق/,
    patternOfSendMessage: /^ار/,
};

//The vocabulary of the voice assistant
export const assistantMessages_EN =
{
    "reqCommand": "what would you like to do?",
    "isDone": "ok, press on the screen if you want to do anything else",
    "notDetected": "Command not detected Please try again",
    "cancel": "Operation canceled",
    "send": {
        "reqContact": "who do you want to send a message to?",
        "reqMessage": "what would you like to send?",
        "approveAndContinue": "sending your message, say yes if u wish to do anything else",
    },
    "read": {
        "reqContact": "who do you want to read a message from?",
        "reqNumOfMessages": "how many messages would you like to read?",
        "approveAndContinue": "your messages have been read, say yes if u wish to do anything else",
    },
    "exceptions": {
        "contactNotFound": "The given name does not exist in the contacts",
        "numOfMessages": "The given number is incorrect, please try again",
    },
    "received": {
        "newMessage": "new message from",
        "messageContent": "message content"
    }
};
export const assistantMessages_RU =
{
    "reqCommand": "Какое действие вы хотите выполнить?",
    "isDone": "Коснитесь экрана, если вы хотите выполнить дополнительное действие",
    "notDetected": "Запрос не обнаружен. Пожалуйста, попробуйте снова",
    "cancel": "Запрос отменён",
    "send": {
        "reqContact": "Кому вы хотите отправить сообщение?",
        "reqMessage": "Какое сообщение вы хотите отправить?",
        "approveAndContinue": "Отправка сообщения. Скажите да,  если вы хотите выполнить дополнительное действие. ",
    },
    "read": {
        "reqContact": "Сообщение какого отправителя вы хотите прочитать?",
        "reqNumOfMessages": "Сколько сообщений вы хотите прочитать?",
        "approveAndContinue": "Ваши сообщения прочитаны. Скажите да, если вы хотите выполнить дополнительное действие. ",
    },
    "exceptions": {
        "contactNotFound": "Указанное имя отсутствует в списке контактов",
        "numOfMessages": "Указанный номер не верен, пожалуйста, попробуйте снова",
    },
    "received": {
        "newMessage": "новое сообщение от",
        "messageContent": "содержание сообщения"
    }
};
export const assistantMessages_AR =
{
    "reqCommand": "ماذا تريد ان تفعل",
    "isDone": "حسنًا ، اضغط على الشاشة إذا كنت تريد فعل أي شيء آخر",
    "notDetected": "لم يتم الكشف عن الأمر يرجى المحاولة مرة أخرى",
    "cancel": "تم إلغاء العملية",
    "send": {
        "reqContact": "لمن تريد أن ترسل رسالة",
        "reqMessage": "ماذا تريد أن ترسل",
        "approveAndContinue": "إرسال رسالتك ، قل نعم إذا كنت ترغب في فعل أي شيء آخر",
    },
    "read": {
        "reqContact": "من الذي تريد قراءة رسالة منه?",
        "reqNumOfMessages": "كم عدد الرسائل التي ترغب في قراءتها?",
        "approveAndContinue": "تمت قراءة رسائلك ، قل نعم إذا كنت ترغب في فعل أي شيء آخر",
    },
    "exceptions": {
        "contactNotFound": "الاسم المعطى غير موجود في جهات الاتصال",
        "numOfMessages": "الرقم المحدد غير صحيح ، يرجى المحاولة مرة أخرى",
    },
    "received": {
        "newMessage": "رسالة جديدة من",
        "messageContent": "محتوى الرسالة"
    }
};
// -------- prepared case when hebrew TTS will be ready ---------- may take a few years...
// export const assistantMessages_HE =
// {
//     "reqCommand": "מה תרצה לעשות?",
//     "isDone": "אוקיי, תלחץ על המסך אם תרצה לבצע פעולה נוספת",
//     "notDetected": "הפקודה לא נקלטה, אנא נסה שנית",
//     "cancel": "הפעולה בוטלה",
//     "send": {
//         "reqContact": "למי תרצה לשלוח הודעה?",
//         "reqMessage": "מה תרצה לשלוח?",
//         "approveAndContinue": "ההודעה נשלחת, אמור כן אם תרצה לבצע פעולה נוספת",
//     },
//     "read": {
//         "reqContact": "ממי תרצה לקרוא הודעה?",
//         "reqNumOfMessages": "כמה הודעות תרצה לקרוא?",
//         "approveAndContinue": "ההודעות נקראו, אמור כן אם תרצה לבצע פעולה נוספת",
//     },
//     "exceptions": {
//         "contactNotFound": "השם אינו קיים ברשימת אנשי הקשר",
//         "numOfMessages": "המספר שגוי, אנא נסה שנית",
//     },
//     "received": {
//         "newMessage": "התקבלה הודעה מ",
//         "messageContent": "תוכן ההודעה"
//     }
// };
export const assistantMessages_HE =
{
    "reqCommand": "what would you like to do?",
    "isDone": "ok, press on the screen if you want to do anything else",
    "notDetected": "Command not detected Please try again",
    "cancel": "Operation canceled",
    "send": {
        "reqContact": "who do you want to send a message to?",
        "reqMessage": "what would you like to send?",
        "approveAndContinue": "sending your message, say ken if u wish to do anything else",
    },
    "read": {
        "reqContact": "who do you want to read a message from?",
        "reqNumOfMessages": "how many messages would you like to read?",
        "approveAndContinue": "your messages have been read, say ken if u wish to do anything else",
    },
    "exceptions": {
        "contactNotFound": "The given name does not exist in the contacts",
        "numOfMessages": "The given number is incorrect, please try again",
    },
    "received": {
        "newMessage": "new message from",
        "messageContent": "message content"
    }
};

//User commands for comparison
export const userInput_EN =
{
    "sendMessage": "send a message",
    "readMessage": "read a message",
    "sendMessagePartial": "se a message",
    "readMessagePartial": "re a message",
    "message": " a message",
    "yes": "yes",
    "no": "no",
    "languageCode": "en-US"
};
export const userInput_RU =
{
    "sendMessage": "отправить сообщение",
    "readMessage": "прочитать сообщение",
    "sendMessagePartial": "отпр сообщение",
    "readMessagePartial": "проч сообщение",
    "message": " сообщение",
    "yes": "да",
    "no": "нет",
    "languageCode": "ru-RU"
};
export const userInput_AR =
{
    "sendMessage": "ارسل رسالة",
    "readMessage": "اقرأ رسالة",
    "sendMessagePartial": "ار رسالة",
    "readMessagePartial": "اق رسالة",
    "message": " رسالة",
    "yes": "نعم",
    "no": "لا",
    // "languageCode": "ar-EG"   --- optional type of arabic
    "languageCode": "ar-SA"
};
export const userInput_HE =
{
    "sendMessage": "שלח הודעה",
    "readMessage": "קרא הודעה",
    "sendMessagePartial": "של הודעה",
    "readMessagePartial": "קר הודעה",
    "message": " הודעה",
    "yes": "כן",
    "no": "לא",
    "languageCode": "he-IL"
};

//Manual
export const manual =
{
    "read": {
        "EN": {
            "header": "Read Message Manual",
            "body": {
                "firstPara": "In order to initiate a command, first press on the screen, and wait for the assistant response.",
                "secondPara": "Wait for the assistant response between each one of your commands.",
                "thirdPara": "To read a message:",
                "fourthPara": "1. Ask to 'Read a message'.",
                "fifthPara": "2. Provide the full contact name.",
                "sixthPara": "3. Provide the number of messages you want to read.",
            }
        }
     },
     "write": {
        "EN": {
            "header": "Write Message Manual",
            "body": {
                "firstPara": "In order to initiate a command, first press on the screen, and wait for the assitant response.",
                "secondPara": "Wait for the assistant response between each one of your commands.",
                "thirdPara": "To write a message:",
                "fourthPara": "1. Ask to 'Send a message'.",
                "fifthPara": "2. Provide the full contact name.",
                "sixthPara": "3. Provide the message you want to send.",
            }
        }
    }
}
