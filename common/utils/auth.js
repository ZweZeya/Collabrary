import Web3 from 'web3';
import AuthContractJSON from "../../build/contracts/AuthContract.json";
const truffleContract = require('@truffle/contract');


const checkIfWalletConnected = async () => {
    const accounts = await window.ethereum.request({method: 'eth_accounts'});
    if (accounts && accounts.length > 0) {
        return true;
    } else {
        return false;
    }
}

const connectWallet = async () => {
    if (window.ethereum) {
        try {
            // await window.ethereum.request({ method: 'eth_requestAccounts' });
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } catch (err) {
            console.log(err)
        }
    } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log("No wallet");
    }
}

const loadContract = async () => {
    const contract = truffleContract(AuthContractJSON);
    contract.setProvider(window.web3.currentProvider);
    const userAddress = window.web3.utils.toChecksumAddress((await window.ethereum.request({method: 'eth_accounts'}))[0]);
    const AuthContract =  await contract.deployed();
    const user = await loadUser(AuthContract, userAddress);
    return { AuthContract, userAddress, user };
}

const loadUser = async (contract, address) => {
    return await contract.users(address);
}

const load = async () => {
    await connectWallet();
    const contract = loadContract();
    return contract;
}

export { connectWallet, checkIfWalletConnected, load };