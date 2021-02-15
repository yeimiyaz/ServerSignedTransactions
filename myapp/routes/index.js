var express = require('express');
var router = express.Router();
const Web3 = require('web3');
var Tx = require('ethereumjs-tx');
//Remix
var contractAddr = '0xFe3f15236a42a6562FbD9f8F4E1984fEfB934e74';

//ABI of the contract Stock.sol from Remix
var abi =
[
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "symbol",
				"type": "bytes4"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "volume",
				"type": "uint256"
			}
		],
		"name": "setStock",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "symbol",
				"type": "bytes4"
			}
		],
		"name": "getStockPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "symbol",
				"type": "bytes4"
			}
		],
		"name": "getStockVolume",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
 
function init() {
  console.log("start"); 
 var TxObj = Tx.Transaction;
 //Ganache 
 const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
 web3.eth.getAccounts(console.log);
 let contractInstance = new web3.eth.Contract(abi, contractAddr);
 console.log("contractInstance");

 //MetaMask
 const account = '0xa1eE56021e66773377024079C0A090886D6d8d2A';
 //MetaMask
 const privateKey = Buffer.from('873ab9e1026a4277ca15ff14115287af7efc3773ddd19102244453949639b52e', 'hex');
 
 //Call function setStock() of the contract Stock.sol
 const _data = contractInstance.methods.setStock('0x40', 10, 1).encodeABI();
 console.log(_data);
 var rawTx = {};
 web3.eth.getTransactionCount(account).then(nonce => {
 rawTx = {
 nonce: nonce,
 gasPrice: '0x20000000000',
 gasLimit: '0x41409',
 to: contractAddr,
 value: 0,
 data: _data
 }
 
 //Sign the transaction
 var tx = new TxObj(rawTx);
 tx.sign(privateKey);
 var serializedTx = tx.serialize();
 
 //Send signed transaction
 web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
 .on('receipt', console.log);
 
 });
}

/* GET home page. */
router.get('/', function (req, res, next) {
  init();
  res.render('index', { title: 'Express' });
});

module.exports = router;
