import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

import validateInput from '../shared/validations/common';
import { sendResetPasswordEmail } from "../mailer";

export default {
  confirmation: (req, res) => {
    const token = req.body.token;
    new User({confirmation_token: token}).fetch().then(user => {
      user.save({confirmation_token: '', confirmed: true}).then(savedUser =>
        savedUser ? res.json({confirmed: true}) : res.status(400).json({})
      );
    });
  },

  signIn: (req, res) => {
    const { email, password } = req.body.credentials;
    const userInfo = { email, password };
    const { errors, isValid } = validateInput(
      userInfo, ['email', 'password']
    );

    const userSignIn = (email, password) => {
      new User({ email: email }).fetch().then(user => {
        if (user && user.isValidPassword(password)) {
          res.json({confirmed: user.get('confirmed'), token: user.generateJWT() });
        } else {
          res.status(400).json({ errors: { login: 'Invalid credentials' } });
        }
      });
    };

    isValid ? userSignIn(email, password) : res.status(400).json(errors);
  },

  requestResetPassword: (req, res) => {
    const email = req.body.email;
    const { errors, isValid } = validateInput(email, ['email']);

    const userRequestResetPassword = (email) => {
      new User(email).fetch().then(user => {
        if (user) {
          const toUserJSON = {email: email.email, resetPasswordLink: user.generateResetPasswordLink()};
          sendResetPasswordEmail(toUserJSON);
          res.json({});
        } else {
          res.status(400).json({email: "Email not Found" });
        }
      });
    };

    isValid ? userRequestResetPassword(email) : res.status(400).json(errors);
  },

  resetPassword: (req, res) => {
    const { token, newPassword, cfmPassword } = req.body.data;
    const { errors, isValid } = validateInput(
      {newPassword, cfmPassword}, ['newPassword', 'cfmPassword']
    );

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ errors: {token: "Invalid token"} })
      } else {
        const userResetPassword = (newPassword) => {
          new User({id: decoded.id}).fetch().then(user =>  {
            if (user) {
              user.save(user.hashPassword(newPassword)).then(() => res.json({}) );
            } else {
              res.status(401).json({ errors: {token: "Invalid token"} });
            }
          });
        };

        isValid ? userResetPassword(newPassword) : res.status(400).json(errors);
      }
    });
  },

  validateToken: (req, res) => {
    jwt.verify(req.body.token, process.env.JWT_SECRET, err =>
      err ? res.status(401).json({}) : res.json({})
    );
  }
}
