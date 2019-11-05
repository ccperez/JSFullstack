import express from 'express';
import user from '../controllers/authentications.js';

const router = express.Router();

router.post('/signup/confirmation', (req, res) => {
  user.confirmation(req, res);
});

router.post('/', (req, res) => {
  user.signIn(req, res);
});

router.post('/reset_password_request', (req, res) => {
  user.requestResetPassword(req, res);
});

router.post('/reset_password', (req, res) => {
  user.resetPassword(req, res);
})

router.post('/validate_token', (req, res) => {
  user.validateToken(req, res);
});

export default router;
