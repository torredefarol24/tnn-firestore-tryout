var config = {
  apiKey: AppKeys.apiKey,
  authDomain:  AppKeys.authDomain,
  databaseURL: AppKeys.databaseURL,
  projectId: AppKeys.projectId,
  storageBucket: AppKeys.storageBucket,
  messagingSenderId: AppKeys.messagingSenderId
};
firebase.initializeApp(config);

const firebaseDB = firebase.firestore();

var firebaseDBConfig = {
  timestampsInSnapshots : true
}

firebaseDB.settings(firebaseDBConfig);
