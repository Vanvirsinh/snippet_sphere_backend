require('dotenv').config();
require('./connection');
const express = require('express');

const app = express();



const port = process.env.PORT;

app.listen(port, () => console.log(`Server is running on port ${port}...`));