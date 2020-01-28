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
                const { lnd } = lnService.authenticatedLndGrpc({
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
            
        },
        subscribeToChainAddress: (params) => {
            return new Promise((resolve, reject) => {
                const { lnd } = lnService.authenticatedLndGrpc({
                    cert: TLS_CERTS[params.user],
                    macaroon: MACAROONS[params.user],
                    socket: `127.0.0.1:${PORTS[params.user]}`
                });

                const subscription = lnService.subscribeToChainAddress({
                    lnd,
                    bech32_address: process.env.ALICE_ADDRESS
                })

                subscription.on('confirmation', ({ block, transaction }) => {
                    console.log('confirmation block')
                    console.log(block)
                    // Fetch transaction amount
                    // Fetch next setblock for memberId: process.env.MEMBER_ID
                    // If setblock.amount < transaction.amount + setblock.paidAmount, fund block then and emit
                    // Else add amount to setblock.paidAmount
                })
            })
            
        }
    }
})()