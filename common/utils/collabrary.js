const truffleContract = require('@truffle/contract');
const CollabraryContractJSON = require("../../build/contracts/CollabraryContract.json");
const { connectWallet } = require("./auth");

const loadContract = async () => {
    const contract = truffleContract(CollabraryContractJSON);
    contract.setProvider(window.web3.currentProvider);
    const CollabraryContract =  await contract.deployed();
    return CollabraryContract
};

const load = async () => {
    await connectWallet();
    const contract = await loadContract();
    return contract;
}

export default load;