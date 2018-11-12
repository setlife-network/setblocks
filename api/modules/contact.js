// So many utility functions (https://lodash.com/docs)
var _ = require('lodash');
var sendgrid = require('../handlers/sendgrid');

var contactModule = module.exports = (function() {

    const sendEmail = function(params) {        
        return new Promise(function(resolve, reject) {
            params.recipient = params.email
            params.html = '<p>Message from {{name}}</p></br><p>{{message}}</p>'
            params.substitutions = {
                name: params.name,
                message: params.message
            } 
            
            sendgrid.sendEmail(params)
            .then(function(params) {
                resolve(params);
            })
            .catch(reject);
        });
    };

    return {
        sendEmail: sendEmail,
    };
})();