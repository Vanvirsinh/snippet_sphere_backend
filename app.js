require('dotenv').config();
require('./connection');
const express = require('express');
const otpRoute = require('./routes/auth/otpRoute');
const authRoute = require('./routes/auth/authRoute');

const app = express();

app.use(express.json());

app.use('/api/auth', otpRoute);
app.use('/api/auth', authRoute);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server is running on port ${port}...`));