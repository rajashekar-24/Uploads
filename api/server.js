var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Uploads',
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
    .then(res => console.log('db connected '))
    .catch(console.error());
module.exports = mongoose;