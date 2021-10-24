const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        First_name: { type: String },
        Last_name: { type: String },
        Introduction: { type: String },
        Email: { type: String },
        Phone: { type: Number },
        Experience: { type: Number },
        Achievements: { type: String }
    },
    {
        timestamps: true
    })
module.exports = userSchema;