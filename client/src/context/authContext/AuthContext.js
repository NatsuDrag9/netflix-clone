import { createContext, useEffect, useReducer } from "react";
import {LoginReducer, RegisterReducer} from './AuthReducer'

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  // user: null,
  isFetching: false,
  isNewUser: true,
  error: false,
};

const combinedReducer = (state, action) => {
  return {
    ...LoginReducer(state.login, action),
    ...RegisterReducer(state.register, action),
  };
}

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(combinedReducer, initialState);

  useEffect(()=> {
    localStorage.setItem("user",JSON.stringify(state.user) )
  }, [state.user])

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        isNewUser: state.isNewUser,
        error: state.error,
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
