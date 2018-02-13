import { API_KEY } from 'secrets';

export const environment = {
  production: true,
  firebase: {
    apiKey: API_KEY,
    authDomain: "stiki-notes.firebaseapp.com",
    databaseURL: "https://sentiment-notes.firebaseio.com",
    projectId: "sentiment-notes",
    storageBucket: "gs://sentiment-notes.appspot.com",
    messagingSenderId: "733040399391"
  }
};
