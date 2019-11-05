import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import isEmpty from 'lodash/isEmpty';

import User from '../models/User';

import { sendConfirmationEmail } from '../mailer';
import validateInput from '../shared/validations/common';

export default {
  isExist: (req, res) => {
    const email = req.params.identifier;
    User.where({ email: email }).fetch().then(user =>
      res.json(user ? {user: {email: email, confirmed: user.get('confirmed')}} : {user: {email: '', confirmed: false}})
    );
  },

  signUp: (req, res) => {
    const { email, password } = req.body.userData;
    const userInfo = { email, password };
    const { errors, isValid } = validateInput(
      userInfo, ['email', 'password']
    );

    const userSignUp = (email, password) => {
      const password_hash = bcrypt.hashSync(password, 10);
      const confirmation_token = jwt.sign({ email: email, confirmed: false }, process.env.JWT_SECRET);
      const toUserJSON = { email: email, confirmed: false, token: confirmation_token };

      new User({ email: email }).fetch().then(user => {
        if (user) {
          if (!user.get('confirmed')) {
            user.save({ confirmation_token, password_hash }).then(() => {
              sendConfirmationEmail(toUserJSON);
              res.json({ user: toUserJSON });
            });
          }
        } else {
          User.forge(
            { email, password_hash, confirmation_token },
            { hasTimestamps: true }
          ).save().then(() => {
            sendConfirmationEmail(toUserJSON);
            res.json({ user: toUserJSON });
          });
        }
      }).catch(
        err => res.status(500).json({ error: err })
      )
    };

    isValid ? userSignUp(email, password) : res.status(400).json(errors);
  }

}
