const mongoose = require("mongoose");

// Mongo DB Schema for individual cards
const CardSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    rarity: {
        type: String
    },
    hp: {
        type: Number
    },
    setCode: {
        type: String,
        required: true
    },
    backupId: {
        type: String,
        required: true
    }
}, { strict: false });

module.exports = mongoose.model('Cards', CardSchema);