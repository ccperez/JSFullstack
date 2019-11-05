import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = { isAuthenticated: false, user: {} };

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case USER_LOGGED_IN:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    case USER_LOGGED_OUT:
      return {};
    default:
      return state;
  }
}
