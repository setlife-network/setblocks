// So many utility functions (https://lodash.com/docs)
var _ = require('lodash');

const github = require('../handlers/github')
const stripe = require('../handlers/stripe')

var payments = module.exports = (function () {

    const createAndChargeCustomer = function (params) {
        return new Promise(function (resolve, reject) {
            params.source = params.stripeToken

            if (params.req.session.setblocksUser == null) throw 'Not authenticated'

            console.log(params.req.session.setblocksUser)

            github.fetchUserData({
                accessToken: params.req.session.setblocksUser
            })
            .then(githubUser => {
                console.log(githubUser)
                
                return stripe.createCustomer({
                    email: githubUser.email,
                    source: params.source
                })
            })
            .then(customer => {
                console.log('customer')
                console.log(customer)

                return stripe.createCharge({
                    amount: params.amount,
                    customer: customer.id
                })
            })
            .then(charge => {
                console.log('charge')
                console.log(charge)

                return 'Charge succeeded'
            })
            .then(resolve)
            .catch(reject)
        });
    };

    return {
        createAndChargeCustomer,
    };
})();