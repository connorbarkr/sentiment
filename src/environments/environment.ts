// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { API_KEY } from 'secrets';

export const environment = {
  production: API_KEY,
  firebase: {
    apiKey: "AIzaSyA7QtY1reK4b7MsQKb_LaWFuqJjRhwZzsA",
    authDomain: "stiki-notes.firebaseapp.com",
    databaseURL: "https://sentiment-notes.firebaseio.com",
    projectId: "sentiment-notes",
    storageBucket: "gs://sentiment-notes.appspot.com",
    messagingSenderId: "733040399391"
  }
};
