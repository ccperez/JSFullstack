require('dotenv').config();

import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import contact from './server/routes/contact';
import users   from './server/routes/users';
import auth    from './server/routes/auth';

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/contact', contact);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
