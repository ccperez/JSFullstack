import decode from "jwt-decode";
import { userLoggedIn, userLoggedOut } from "../actions/authActions";
import setAuthorizationHeader from "./setAuthorizationHeader";

export default (store) => {
  const { appJWT } = localStorage;
  if (appJWT) {
    const decodeToken = decode(appJWT);
    const isTokenExpired = (decodeToken.exp < (Date.now()/1000));
    if (isTokenExpired) {
      localStorage.removeItem('appJWT');
      setAuthorizationHeader();
      store.dispatch(userLoggedOut());
    } else {
      setAuthorizationHeader(appJWT);
      store.dispatch(userLoggedIn(decodeToken));
    }
  }
};
