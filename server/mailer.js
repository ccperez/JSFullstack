import nodemailer from "nodemailer";

const from = '"DomainEmail" <info@emaildomain.com>';

const {
  HOST, EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS,
  GMAIL_HOST, GMAIL_PORT, GMAIL_SECURE, GMAIL_USER, GMAIL_PASS
} = process.env;

function setup() {
  return nodemailer.createTransport({
    host   : GMAIL_HOST || EMAIL_HOST,
    port   : GMAIL_PORT || EMAIL_PORT,
    secure : GMAIL_SECURE,
    auth : {
      user : GMAIL_USER || EMAIL_USER,
      pass : GMAIL_PASS || EMAIL_PASS
    }
  });
}

export function receivedEmail(contact) {
  const email = {
    from, to: GMAIL_USER || from,
    subject: contact.subject,
    html: `
      <b>Hi, </b><br />
      <p>${contact.message}</p><br />
      <p>Regards, <br />${contact.name}</p>
    `
  };
  const transport = setup();
  transport.sendMail(email);
}

export function sendConfirmationEmail(user) {
  const email = {
    from, to: user.email,
    subject: "Welcome...",
    html: `
    <b>Hi, </b><br />
    <p>
    Thank you for signing up.  Please, confirm your registion.
    <a href='${HOST}/signup/confirmation/${user.token}'>click confirm</a><br />
    <p>Regards, <br />System Admin</p>
    `
  };

  const transport = setup();
  transport.sendMail(email);
}

export function sendResetPasswordEmail(user) {
  const email = {
    from, to: user.email,
    subject: "Reset Password",
    html: `
    <b>Hi, </b><br />
    <p>
    To reset password follow this link
    <a href='${user.resetPasswordLink}'>click confirm</a><br />
    <p>Regards, <br />System Admin</p>
    `
  };

  const transport = setup();
  transport.sendMail(email);
}
