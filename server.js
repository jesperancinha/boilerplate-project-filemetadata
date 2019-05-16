'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer  = require('multer');
var fileUploads = multer({ dest: 'file-uploads/' });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});

app.post("/api/fileanalyse", fileUploads.single('upfile'), (req, res)=>{
    let file = req.file;
    res.json({name: file.originalname, type:file.mimetype,  size: file.size})
});
