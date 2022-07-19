import firestore from '@react-native-firebase/firestore';

//reference to a users collection in firebase database
const ref = firestore().collection('users');

//global variable will hold the users list
var list = [];

//Function responsible for adding a user to the list of users in the database after checking if it exists in the database
export const writeUserInDb = async (data) => {
  if (!await checkIfUserExist(data)) {
    await ref.add(data);
    return true;
  } else {
    return false;
  }
};

//A function is responsible for querying the database at the request of the user list
const getUsers = async () => {
  await firestore().collection('users').get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      list.push({
        userName: doc.data().userName,
        password: doc.data().password
      });
    });
  });
};

//A function is responsible for querying the database to check the existence of the user in the database
export const checkIfUserExist = async (data) => {
  await getUsers();
  for (let item of list) {
    if (data.userName === item.userName && data.password === item.password) {
      return true;
    }
  }
  return false;
};
