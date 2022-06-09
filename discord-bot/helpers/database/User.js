const mariadb  = require("mariadb");

module.exports.getWallet_byId = async(discord_id) => {
    try {
        mariadb.createPool({
            host: '127.0.0.1', 
            user:'root', 
            password: '',
            connectionLimit: 5
        }).getConnection().then(conn => {
                return conn.query(`SELECT * FROM chandy.users WHERE discord_id = "${discord_id}";`)
        })
    } catch (e) {console.log(e)}
}