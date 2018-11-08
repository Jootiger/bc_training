/*test.js*/
//blockchain.js import
const Blockchain = require('./blockchain');

const jscoin = new Blockchain();

const previousBlockHash = 'previousblockhash';
const currentBlockData = [
    {sender: 'aaa', recipient: 'bbb', amount: 100},
    {sender: 'ccc', recipient: 'ddd', amount: 200},
    {sender: 'eee', recipient: 'fff', amount: 400},
];
//const nonce = 200;
//e1db0238648973013389bb8f35514d309db0e8da2a7fbc127c7b1f0303a5dde5
//ca3bd0c3f57e94c7a8588b1391a176e11ec442998948c5fa20f7f71ddc4996e8
//26f818534683440df377642e5fab72f51557a515eeafe9153b8382db0fff8970

// console.log(">>>>>" + jscoin.difficulty);
// let nonce = jscoin.pow(previousBlockHash, currentBlockData);

// console.log(nonce);

// console.log(jscoin.hashBlock(previousBlockHash, currentBlockData, nonce));

// jscoin.difficulty = 2;
// console.log(">>>>>" + jscoin.difficulty);
// nonce = jscoin.pow(previousBlockHash, currentBlockData);
// console.log(nonce);
// console.log(jscoin.hashBlock(previousBlockHash, currentBlockData, nonce));

const txs = [
    {sender: 'aaa', recipient: 'bbb', amount: 100},
    {sender: 'ccc', recipient: 'ddd', amount: 200},
    {sender: 'eee', recipient: 'fff', amount: 400},
];

console.log(jscoin.calculateMerkleRoot(txs));