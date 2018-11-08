/* blockhain.js */
//import sha256
const sha256 = require('sha256');

//Merkle 모듈 임포트
const merkle = require('merkle');

// 블록체인 객체를 정의
function Blockchain(){
    //블록체인
    this.chain = [];
    //블록에 들어가지 못한 트랜잭션들
    this.pendingTransactions = [];

    //난이도 목표 추가
    //this.difficulty = '00000';
    this.difficulty = 1;

    //제네시스 블록을 생성
    this.createNewBlock(0, 0, 0, 0); 
}

// 파라미터로 전달된 해쉬가 difficulty에 설정된 개수만큼 0으로 시작하고 있는지 체크

Blockchain.prototype.checkDifficulty = function(hash){
    let head = hash.substring(0, this.difficulty);
    return (head.match(/0/g)||[]).length == this.difficulty;
};

// 블록의 해쉬를 구하는 함수를 추가
Blockchain.prototype.hashBlock 
    = function(previousBlockHash, currentBlockData, nonce){
        const merkleRoot = this.calculateMerkleRoot(currentBlockData['transactions']);
        //const data = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
        const data = previousBlockHash + nonce.toString() + merkleRoot;
        const hash = sha256(data);    
        return hash;
};

// 작업증명(PoW)을 수행하는 함수를 추가
Blockchain.prototype.pow = function(previousBlockHash, currentBlockData){
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    //while(hash.substring(0, 5) != this.difficulty){
    while(!this.checkDifficulty(hash)){
        nonce++;
        let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    }
    return nonce;
};
//트랜잭션 정보를 이용해서 머클루트를 계산해서 반환하는 함수
Blockchain.prototype.calculateMerkleRoot = function(transactions){
    // JSON 타입에 트랜잭션 정보를 문자열 배열 형태로 변환한 값
    var strArrayTxs = [];
    transactions.forEach(tx => {
        strArrayTxs.push(JSON.stringify(tx));
    });

    // 머클트리 생성
    var tree = merkle('sha256').sync(strArrayTxs);
    return tree.root();
};

//블록 생성 함수
Blockchain.prototype.createNewBlock = function(previousBlockHash, nonce, hash, merkleRoot){
    const newBlock ={
        index: this.chain.length +1,
        timestamp: Date.now(),
        merkleRoot: merkleRoot,
        nonce: nonce,
        hash: hash,
        previousBlockhash: previousBlockHash,
        transactions: this.pendingTransactions,
    }

    this.pendingTransactions = [];  
    this.chain.push(newBlock);

    return newBlock;
};

//Add function to get Last Block 
Blockchain.prototype.getLastBlock = function(){
    return this.chain[this.chain.length - 1];
};


//Add function to transaction
Blockchain.prototype.createNewTransaction = function(_sender, _recipient, _amount){
    //Constroctur of Transactions
    const newTransaction = {
        sender: _sender,
        recipient: _recipient,
        amount: _amount
    };

    // 새 트랜잭션을 대기중인 트랜잭션에 추가
    this.pendingTransactions.push(newTransaction);

    return;
};

//BlockChain Modulization -> Use this on ohter files
module.exports = Blockchain;
