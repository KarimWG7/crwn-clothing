import { initializeApp } from "firebase/app";
import {
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
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

export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additional) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  // if user data does not exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additional,
      });
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("This user is already signed up");
      } else {
        console.error(err.message);
      }
    }
  }

  // if user data exists
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  const user = await createUserWithEmailAndPassword(auth, email, password);
  return user;
};