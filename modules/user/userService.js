const db = require('../../model');

const readUser = async (searchQuery, details) => {
    const data = await db.Users.findOne(searchQuery, details);
    return data;
};

const readUsers = async (searchQuery, details) => {
    const data = await db.Users.find(searchQuery, details);
    return data;
};

const addUser = async (details) => {
    const data = await db.Users.insertMany(details);
    return data;
};

module.exports = {
    readUser,
    readUsers,
    addUser
}