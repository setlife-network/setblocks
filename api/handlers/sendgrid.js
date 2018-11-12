const sgMail = require('@sendgrid/mail')
const { SENDGRID } = require('../config/credentials')

sgMail.setApiKey(SENDGRID.KEY)

const sendGrid = module.exports = (() => {
    return {
        sendEmail: params => {
            console.log(params)
            return new Promise((resolve, reject) => {
                sgMail.send({
                    from: {
                        name: 'Support',
                        email: 'support@example.com'
                    },
                    to: params.recipient,
                    subject: 'Subject Line',
                    html: params.html,
                    text: params.message,
                    substitutionWrappers: ['{{', '}}'],
                    substitutions: params.substitutions
                })
                .then(resolve)
                .catch(err => console.log(err))
            })
        }
    }
})();