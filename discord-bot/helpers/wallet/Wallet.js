
 
module.exports = function createWallet(userid) {

    return web3.Keypair.generate();
}