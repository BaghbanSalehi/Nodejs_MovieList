const mongoose = require('mongoose');

const RwSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    movieTitle:{
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Review',RwSchema);