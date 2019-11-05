import api from '../api';

export const userSignUp = (userData) => dispatch => api.user.signup(userData);

export const isUserExists = (identifier) => dispatch => api.user.isExists(identifier)
