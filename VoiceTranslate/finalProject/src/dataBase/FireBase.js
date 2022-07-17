import firestore from '@react-native-firebase/firestore';

const ref = firestore().collection('users');
var list = [];

export const writeUserInDb = async (data) => {
  if (!await checkIfUserExist(data)) {
    await ref.add(data);
    return true;
  } else {
    return false;
  }
};

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

export const checkIfUserExist = async (data) => {

  await getUsers();
  for (let item of list) {
    if (data.userName === item.userName && data.password === item.password) {
      return true;
    }
  }
  return false;
};
