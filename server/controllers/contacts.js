import Contact from '../models/Contact';
import { receivedEmail } from '../mailer';
import validateInput from '../shared/validations/contact';

export default {
  newMessage: (req, res) => {
    const { name, email, subject, message } = req.body.message;
    const contactInfo = { name, email, subject, message };
    const { errors, isValid } = validateInput(
      contactInfo, ['name','email','subject','message']
    );

    const contactMessage = (contactInfo) => {
      Contact.forge(
        contactInfo, { hasTimestamps: true }
      ).save().then((savedContact) => {
        receivedEmail(contactInfo);
        res.json({ success: true });
      }).catch(err =>
        res.status(500).json({ error: err })
      );
    };

    isValid ? contactMessage(contactInfo) : res.status(400).json(errors);
  }
}
