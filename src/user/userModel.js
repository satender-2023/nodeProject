var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('employees', userSchema);
