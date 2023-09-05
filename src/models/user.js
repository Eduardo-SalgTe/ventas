const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    op: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    passw:{
        type: String,
        required: false
    }
});

module.exports = mongoose.model('User',userSchema);