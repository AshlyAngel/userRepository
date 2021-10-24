// mongodb connection
const mongoose = require('mongoose');
const config = require('../config');
const dotenv = require('dotenv');
dotenv.config();
const userSchema = require('./user');
mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true

    },
    (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Database connected successfully...');
        }
    }
);
const Users = mongoose.model(config.DATABASE.userCollectionName, userSchema);
module.exports = {
    Users
}