const lightningNode = module.exports = (() => {
    const lnService = require('ln-service');
    const {
        PORTS,
        MACAROONS,
        TLS_CERTS
    } = require('../config/credentials')

    return {
        getUserWalletInfo: (params) => {
            return new Promise((resolve, reject) => {
                const lnd = lnService.lightningDaemon({
                    cert: TLS_CERTS[params.user],
                    macaroon: MACAROONS[params.user],
                    socket: `127.0.0.1:${PORTS[params.user]}`
                });

                lnService.getWalletInfo({ lnd }, (error, result) => {
                    console.log(error);
                    console.log(result);
                    resolve(result)
                });
            })
            
        }
    }
})()