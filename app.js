require('dotenv').config();
require('./connection');
const cors = require('cors');
const express = require('express');
const otpRoute = require('./routes/auth/otpRoute');
const authRoute = require('./routes/auth/authRoute');
const profileRoute = require('./routes/profile/profile');
const collectionRoute = require('./routes/snippets/collection');
const snippetRoute = require('./routes/snippets/snippetRoute');
const followRoute = require('./routes/profile/followRoute');
const commentRoute = require('./routes/snippets/commentRoute');
const likeRoute = require('./routes/snippets/likeRoute');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', otpRoute);
app.use('/api/auth', authRoute);
app.use('/api/profile', profileRoute);
app.use('/api/collection', collectionRoute);
app.use('/api/snippet', snippetRoute);
app.use('/api/follow', followRoute);
app.use('/api/comment', commentRoute);
app.use('/api/like', likeRoute);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server is running on port ${port}...`));