import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChangedListner,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

const defaultUser = {
  currentUser: null,
  setCurrentUser: () => null,
};

export const userContext = createContext(defaultUser);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    onAuthStateChangedListner(async (user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    // return unsubscribe
  }, []);

  // TODO implement context provider for current logged in user data and methods to set it
  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};
