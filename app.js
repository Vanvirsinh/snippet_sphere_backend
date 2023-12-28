require('dotenv').config();
require('./connection');
const express = require('express');
const { fetchUser } = require('./middleware/fetchUser');
const otpRoute = require('./routes/auth/otpRoute');
const authRoute = require('./routes/auth/authRoute');
const profileRoute = require('./routes/profile/profile');

const app = express();

app.use(express.json());

app.use('/api/auth', otpRoute);
app.use('/api/auth', authRoute);
app.use('/api/profile',fetchUser, profileRoute);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server is running on port ${port}...`));