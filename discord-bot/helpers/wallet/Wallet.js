
module.exports = function createWallet() {
    return web3.Keypair.generate();
}