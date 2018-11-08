//blockchain.js import
const Blockchain = require('./blockchain');

const jscoin = new Blockchain();

console.log(jscoin);

//create new Block
jscoin.createNewBlock('000', 100, '111');

console.log(jscoin);
console.log('-----------------');

// add new transaction
jscoin.createNewTransaction('ljh', 'kim', 100);
jscoin.createNewTransaction('ljh', 'kim', 200);
jscoin.createNewTransaction('ljh', 'kim', 300);

console.log(jscoin);
console.log('-----------------');

//add Second transaction
jscoin.createNewBlock('111', 200, '222');
console.log(jscoin);
console.log('-----------------');

console.log(jscoin.getLastBlock());
console.log('-----------------');
