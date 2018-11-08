var express = require('express');
var app = express();

// http://localhost:3000/ 요청이 들어왔을 때 동작하는 기능
app.get('/', function(req, res){
    res.send("Hellow World");
});

app.get('/blockchain', function(req, res){
    res.send("Blockchain start");
});

app.post('/transaction', function(req, res){
    res.send("Transaction Start");
});

app.listen(3000);
