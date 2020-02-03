var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var emailsSchema = new Schema({
    _id: String,
    email: { type: String, unique: true},
    phone: Number,
});

var emails = mongoose.model('emails', emailsSchema);

module.exports = emails;