import api from '../api';

export const contactMessage = (message) =>  dispatch => api.contact.sendmail(message);
