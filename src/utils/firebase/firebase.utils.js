import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7nEbmPuoXcTg-lCAZ66qOVDEnAv_JuIA",
  authDomain: "crwn-clothing-kwg.firebaseapp.com",
  projectId: "crwn-clothing-kwg",
  storageBucket: "crwn-clothing-kwg.appspot.com",
  messagingSenderId: "501155307001",
  appId: "1:501155307001:web:d92316874f88d2aba4f128",
};
// initialize firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
// initialize authentication
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
// initialize firestore
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid); // => (database, collection, identifier)
  console.log(userDocRef);
  // checking if we had the user in the database and getting back the google doc ref
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);

  // if user data does not exist
  if (!userSnapshot.exists()) {
    // create / set the document with the data from userAuth in my collection
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (err) {
      console.errpr("🚫🚫🚫", err);
    }
  }
  // if user data exist
  return userDocRef;
};
