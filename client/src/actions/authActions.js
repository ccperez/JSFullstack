import { USER_LOGGED_IN, USER_LOGGED_OUT } from "./types";

import jwtDecode from 'jwt-decode';

import api from "../api";
import setAuthorizationHeader from "../utils/setAuthorizationHeader";

export const  userLoggedIn = user => ({ type: USER_LOGGED_IN, user });
export const userLoggedOut = ()   => ({ type: USER_LOGGED_OUT })

export const userSignIn = credentials => dispatch =>
  api.user.signin(credentials).then(result => {
    const token = result.data.token;
    localStorage.appJWT = token;
    setAuthorizationHeader(token);
    dispatch(userLoggedIn(jwtDecode(token)));
    return result;
  });

export const logout = () => dispatch => {
  localStorage.removeItem('appJWT');
  setAuthorizationHeader();
  dispatch(userLoggedOut());
}

export const validateToken = token => () =>
  api.user.validateToken(token);

export const confirm = token => () =>
  api.user.confirm(token);

export const resetPasswordRequest = email => () =>
  api.user.resetPasswordRequest(email);

export const resetPassword = data => () =>
  api.user.resetPassword(data);
