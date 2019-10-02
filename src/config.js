import Firebase from 'firebase';
let config = {
  apiKey: "AIzaSyBEU8YtYO5uKQwiWCuBT0MHl0u4CxtAAQA",
  authDomain: "cb-glucose-tracer.firebaseapp.com",
  databaseURL: "https://cb-glucose-tracer.firebaseio.com",
  projectId: "cb-glucose-tracer",
  storageBucket: "cb-glucose-tracer.appspot.com",
  messagingSenderId: "757407503814",
  appId: "1:757407503814:web:69858ca7e072f28ae38ec7",
  measurementId: "G-N4GPY1VGWK"
};
let app = Firebase.initializeApp(config);
export const db = app.database();
