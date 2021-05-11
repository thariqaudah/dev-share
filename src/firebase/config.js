import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCxkzaDgqLM7BZzmAu4DH5UrouKEsfXFH4',
  authDomain: 'vue-dev-share.firebaseapp.com',
  projectId: 'vue-dev-share',
  storageBucket: 'vue-dev-share.appspot.com',
  messagingSenderId: '43074343520',
  appId: '1:43074343520:web:815846b13cfaeaef82a905',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { auth, db, storage, timestamp };
