var utility = require('./utility/utility');

var express = require('express');
var app = express();

const homedir = require('os').homedir();

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});

app.get('/open', (req, res) => {
    let { isDirectory, path } = req.query;
    isDirectory = JSON.parse(isDirectory);
    if(isDirectory) {
        console.log('opendirectory');
        utility.openDirectory(path, res);
    } else {
        console.log('openfile');
        utility.openFile(path, res);
    }
});

app.get('/', (req, res) => {
    utility.openDirectory(homedir, res);
});

var server = app.listen(3000, function () {
    console.log('Server running at http://localhost:' + server.address().port);
})