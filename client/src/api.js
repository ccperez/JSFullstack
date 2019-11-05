import axios from 'axios';

export default {
  contact: {
    sendmail: message =>
      axios.post('/api/contact', { message })
  },
  user: {
    signup: userData =>
      axios.post('/api/users', { userData }),
    signin: credentials =>
      axios.post('/api/auth', { credentials }),
    isExists: identifier =>
      axios.get(`/api/users/${identifier}`),
    validateToken: token =>
      axios.post('/api/auth/validate_token', { token }),
    confirm: token =>
      axios.post('/api/auth/signup/confirmation', { token }),
    resetPasswordRequest: email =>
      axios.post('/api/auth/reset_password_request', { email }),
    resetPassword: data =>
      axios.post('/api/auth/reset_password', { data })
  }
}
