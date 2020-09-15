const mongoose = require("mongoose");

// MongoDB schema for backups
const BackupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Backups', BackupSchema);