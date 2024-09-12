const {Schema, model} = require('mongoose');
const Double = require('@mongoosejs/double');
// const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    password: { type: String, required: true },
    number: { type: String, required: true },
    name: { type: String, required: true },
    soldeUsd: { type: Double, required: true },
    soldeCdf:  { type: Double, required: true },
},{timestamps: true, versionKey: false });

module.exports.User = model('User', userSchema);