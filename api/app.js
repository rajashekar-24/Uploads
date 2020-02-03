var express = require('express')
var app = express();
var multer = require('multer')
var mongoose = require('./server.js');
var emails = require('./modal/emails.js');
//var upload = multer({ dest: 'uploads/' })
const csvtojson = require("csvtojson");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })

var port = 3000;
var cors = require('cors');
app.use(cors({ origin: 'http://localhost:4200', optionsSuccessStatus: 200 }));

app.get('/', (req, res) => {
    res.send('Hello World !!')
})

app.post('/upload', upload.single('file'), function (req, res, next) {
    console.log('req ', req.file);

    if (req.file) {

        csvtojson()
            .fromFile(req.file.path)
            .then(csvData => {
                console.log('csvdata ', csvData);
                //Bulk Insert CSV data
                emails.insertMany(csvData)
                .then(res => {
                        console.log(res);
                        next(res)
                       // res.sendStatus(200).send('Uploaded Successfully !!')
                    })
                 .catch(err =>{
                    if(err)
                    throw err;
                 })               
            })
    }
     res.sendStatus(200).send('Uploaded Successfully !!')
    // req.file is the uploaded file
    // req.body will hold the text fields, if there were any

})

app.listen(port, () => {
    console.log(`server listen to ${port}`);
})