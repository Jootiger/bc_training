/* blockhain.js */
//import sha256
const sha256 = require('sha256');

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
    this.createNewBlock(0, 0, 0); 
}

// 파라미터로 전달된 해쉬가 difficulty에 설정된 개수만큼 0으로 시작하고 있는지 체크

Blockchain.prototype.checkDifficulty = function(hash){
    let head = hash.substring(0, this.difficulty);
    return (head.match(/0/g)||[]).length == this.difficulty;
};

// 블록의 해쉬를 구하는 함수를 추가
Blockchain.prototype.hashBlock 
    = function(previousBlockHash, currentBlockData, nonce){
        const data = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
        const hash = sha256(data);    
        return hash;
};

// 작업증명(PoW)을 수행하는 함수를 추가
Blockchain.prototype.pow 
    = function(previousBlockHash, currentBlockData){
        let nonce = 0;
        let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
        //while(hash.substring(0, 5) != this.difficulty){
        while(!this.checkDifficulty(hash)){
            nonce++;
            let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
        }
        return nonce;
};

//블록 생성 함수
Blockchain.prototype.createNewBlock = function(previousBlockHash, nonce, hash){
    const newBlock ={
        index: this.chain.length +1,
        timestamp: Date.now(),
        transactions: this.pendingTransactions,
        nonce: nonce,
        hash: hash,
        previousBlockhash: previousBlockHash
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
Blockchain.prototype.createNewTransaction = function(_sender, _recipeint, _amount){
    //Constroctur of Transactions
    const newTransaction = {
        sender: _sender,
        recipient: _recipeint,
        amount: _amount
    };

    // 새 트랜잭션을 대기중인 트랜잭션에 추가
    this.pendingTransactions.push(newTransaction);

    return;
};

//BlockChain Modulization -> Use this on ohter files
module.exports = Blockchain;
