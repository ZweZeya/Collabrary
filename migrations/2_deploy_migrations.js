const AuthContract = artifacts.require("AuthContract");
const CollabraryContract = artifacts.require("CollabraryContract");

module.exports = (deployer) => {
    deployer.deploy(AuthContract);
    deployer.deploy(CollabraryContract);
}