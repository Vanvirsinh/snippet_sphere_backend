require('dotenv').config();
require('./connection');
const express = require('express');
const otpRoute = require('./routes/auth/otpRoute');
const authRoute = require('./routes/auth/authRoute');
const profileRoute = require('./routes/profile/profile');
const collectionRoute = require('./routes/snippets/collection');
const snippetRoute = require('./routes/snippets/snippetRoute');
const followRoute = require('./routes/profile/followRoute');
const commentRoute = require('./routes/snippets/commentRoute');

const app = express();

app.use(express.json());

app.use('/api/auth', otpRoute);
app.use('/api/auth', authRoute);
app.use('/api/profile', profileRoute);
app.use('/api/collection', collectionRoute);
app.use('/api/snippet', snippetRoute);
app.use('/api/follow', followRoute);
app.use('/api/comment', commentRoute);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server is running on port ${port}...`));