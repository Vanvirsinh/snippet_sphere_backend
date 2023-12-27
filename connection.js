const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI;

mongoose.connect(URI)
    .then(() => {
        console.log("Connected to Database!");
    })
    .catch((err) => {
        console.log(`Error occured while connecting to DB: ${err}`);
    });