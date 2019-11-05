import express from 'express';
import contact from '../controllers/contacts';

const router = express.Router();

router.post('/', (req, res) => {
  contact.newMessage(req, res);
});

export default router;
