const contract = require('../artifacts/contracts/Salamun.sol/Salamun.json');
const contractAddress = "0x3126acd559dadc121b32565495797ce51e0fbc70";

const Web3 = require('web3');
const web3 = new Web3("https://eth-rinkeby.alchemyapi.io/v2/NdVpZldoRjVjyqGi3odaEznNnFv7hANQ");
const nftContract = new web3.eth.Contract(contract.abi,contractAddress);

const ACCOUNT_PUBLIC_KEY = '0x5Cd3edCA993C4Da1d5bf151a9A1ed8c30eE8DDdB';
const ACCOUNT_PRIVATE_KEY = 'a4b9ddd7186c1d304b7050ee772514b74a13281aafa00afa8493e55f80834c26';

async function mintNft(){
    const nonce = await web3.eth.getTransactionCount(ACCOUNT_PUBLIC_KEY,'latest');

    const tx = {
        'from': ACCOUNT_PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 1000000,
        'data': nftContract.methods.mint(5).encodeABI()
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx,ACCOUNT_PRIVATE_KEY);
    const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
}

async function getBalanceNft(){
    const balanceOf = await nftContract.methods.balanceOf(ACCOUNT_PUBLIC_KEY).call();

    console.log(`Total nft from address ${ACCOUNT_PUBLIC_KEY} is : ${balanceOf}`);
}

async function setBaseURI(){
    const nonce = await web3.eth.getTransactionCount(ACCOUNT_PUBLIC_KEY,'latest');

    const tx = {
        'from': ACCOUNT_PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 1000000,
        'data': nftContract.methods.setBaseURI('https://faerul.com/images/').encodeABI()
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx,ACCOUNT_PRIVATE_KEY);
    const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
}

async function getBaseURI(){
    const baseURI = await nftContract.methods.tokenURI(2).call();

    console.log(`Total URI is : ${baseURI}`);
}

// mintNft();
getBalanceNft();
// getBaseURI();
// setBaseURI();