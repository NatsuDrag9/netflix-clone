import axios from "axios";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
} from "./AuthAction";

export const apiUrl = "https://netflix-clone-server-iota.vercel.app/api"
// export const apiUrl = "http://localhost:8800/api"

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    // Localhost
    // const res = await axios.post("auth/login", user);
    // Vercel
    const res = await axios.post(`${apiUrl}/auth/login`, user);
    dispatch(loginSuccess(res.data));
    return {success: true};
  } catch (err) {
    dispatch(loginFailure());
    return {success: false, message: err.response.data};
  }
};

export const register = async (user, dispatch) => {
  dispatch(registerStart());
  try {
    // Localhost
    // const res = await axios.post("auth/register", user);
    // Vercel
    const res = await axios.post(`${apiUrl}/auth/register`, user);

    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};
