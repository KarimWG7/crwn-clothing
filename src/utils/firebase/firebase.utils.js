import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7nEbmPuoXcTg-lCAZ66qOVDEnAv_JuIA",
  authDomain: "crwn-clothing-kwg.firebaseapp.com",
  projectId: "crwn-clothing-kwg",
  storageBucket: "crwn-clothing-kwg.appspot.com",
  messagingSenderId: "501155307001",
  appId: "1:501155307001:web:d92316874f88d2aba4f128",
};

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)