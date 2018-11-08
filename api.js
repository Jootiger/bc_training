var express = require('express');
var app = express();

var Blockchain = require('./blockchain');
var jscoin = new Blockchain(); //제네시스 블록 생성

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));

// http://localhost:3000/ 요청이 들어왔을 때 동작하는 기능
app.get('/', function(req, res){
    res.send("Hellow World");
});

app.get('/blockchain', function(req, res){
    res.send(jscoin);
});

app.post('/transaction', function(req, res){
    console.log(req.body);
    jscoin.createNewTransaction(req.body.sender, req.body.recipient, req.body.amount);
    res.send(jscoin);
});

app.get('/mining', function(req,res){
    //마지막 블록을 추출 -> 지금 만들려고 하는 블록의 이전 블록
    const lastBlock = jscoin.getLastBlock();

    //마지막 블록의 해쉬를 추출
    const previousBlockHash = lastBlock['hash'];
    
    //대기 중인 트랜잭션을 가져와서 새로 만들 블록에 데이터로 추가
    const currentBlockData = {
        index: lastBlock['index'] + 1 ,
        transactions: jscoin.pendingTransactions        
    }
    //작업증명을 통해서 nonce값을 계산
    const nonce = jscoin.pow(previousBlockHash, currentBlockData);

    //블록해쉬를 계산
    const blockHash = jscoin.hashBlock(previousBlockHash, currentBlockData, nonce);
    //머클루트 계산
    const merkleRoot = jscoin.calculateMerkleRoot(currentBlockData['transactions']);

    //새블록을 생성
    const newBlock = jscoin.createNewBlock(previousBlockHash, nonce, blockHash, merkleRoot);

    //결과를 반환(msg, 새블록)
    res.json(
        {
            msg: currentBlockData['index'] + 'block created.',
            block: newBlock
        }
    );
});
app.listen(3000);
