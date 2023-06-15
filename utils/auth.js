import Web3 from 'web3';

const checkIfWalletConnected = async () => {
    const {ethereum} = window;
    const accounts = await ethereum.request({method: 'eth_accounts'});
    if (accounts && accounts.length > 0) {
        return true;
    } else {
        return false;
    }
}

const connectWallet = async () => {
    if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        window.web3 = new Web3(window.ethereum);
        const account = web3.eth.accounts;
        console.log(account.wallet);
    } else {
        console.log("No wallet");
    }
}

export { connectWallet, checkIfWalletConnected };