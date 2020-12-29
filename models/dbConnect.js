const mongoose = require('mongoose');
const db = require('../config/keys').mongoURI;

const DB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || db, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Successfully connected to DB');
    }
    catch (err) {
        console.log('Error connecting DB', err);
    }
}

module.exports = DB;