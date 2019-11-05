import express from 'express';
import user from '../controllers/users';

const router = express.Router();

router.get('/:identifier', (req, res) => {
  user.isExist(req, res);
});

router.post('/', (req, res) => {
  user.signUp(req, res);
});

export default router;
