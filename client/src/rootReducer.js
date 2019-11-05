import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import  auth from './reducers/authReducers'

export default combineReducers({ flashMessages, auth });
