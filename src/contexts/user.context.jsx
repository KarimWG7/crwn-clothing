import { createContext, useEffect, useReducer } from "react";
import {
  onAuthStateChangedListner,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer.utils";

const defaultUser = {
  currentUser: null,
  setCurrentUser: () => null,
};
export const userContext = createContext(defaultUser);

const USER_ACTIONS_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER ",
};

const INITIAL_STATE = { currentUser: null };

const userReucer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTIONS_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      throw new Error(`Unhandled type ${type} in useReducer`);
  }
};

export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReucer, INITIAL_STATE);
  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTIONS_TYPES.SET_CURRENT_USER, user));
  };

  useEffect(() => {
    onAuthStateChangedListner(async (user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
  }, []);
  const value = { currentUser };
  // TODO implement context provider for current logged in user data and methods to set it
  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};
