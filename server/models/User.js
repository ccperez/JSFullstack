import bookshelf from '../bookshelf';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { HOST,  JWT_SECRET } = process.env;

export default bookshelf.Model.extend({
  tableName: 'users',

  isValidPassword: function(password) {
    return bcrypt.compareSync(password, this.get('password_hash'));
  },

  isEmailMatch: function(email) {
    return email === this.get('email');
  },

  hashPassword: function(password) {
    return { password_hash: bcrypt.hashSync(password, 10) };
  },

  generateJWT: function() {
    return jwt.sign({id: this.get('id'), email: this.get('email')}, JWT_SECRET, {expiresIn: "10s"});
  },

  generateResetPasswordToken: function() {
    return jwt.sign({id: this.get('id')}, JWT_SECRET, {expiresIn: "1h"});
  },

  generateResetPasswordLink: function() {
    return `${HOST}/reset_password/${this.generateResetPasswordToken()}`;
  },

});
