const { STRIPE } = require('../config/credentials')

const Stripe = require('stripe')(STRIPE.SECRET_KEY_TEST)

const stripe = module.exports = (function () {

    const createCharge = (params) => {
        return new Promise((resolve, reject) => {
            Stripe.charges.create(
                {
                    amount: params.amount,
                    customer: params.customer
                },
                (err, charge) => {
                    console.log(err)
                    console.log(charge)
                }
            )
        });
    };

    const createCustomer = (params) => {
        return new Promise((resolve, reject) => {
            Stripe.customers.create(
                {
                    email: params.email,
                    source: params.source
                },
                (err, customer) => {
                    console.log(err)
                    console.log(customer)
                }
            )
        });
    };

    return {
        createCharge,
        createCustomer,
    };

})();