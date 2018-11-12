// So many utility functions (https://lodash.com/docs)
var _ = require('lodash');

var sampleModule = module.exports = (function() {

    const privateFunction1 = function(params) {
        // All functions should only ever need 1 parameter
        // Pass params around to any function in any module as a singleton object
        // Add or rename properties as needed
        
        return new Promise(function(resolve, reject) {
            params.propertyName = 'value1';
            resolve(params);
        });
    };

    const privateFunction2 = function(params) {
        return new Promise(function(resolve, reject) {
            privateFunction1(params)
            .then(function(params) {
                params.newProperty = 'value2';
                params.propertyName = 'overwrittenValue1';

                // Not necessary to return params since it shares scope with the next .then function
                return params;
            })
            .then(function() {
                // params still has properties from previous .then function
                resolve(params);
            })
            .catch(reject);
        });
    };

    return {
        publicFunction1: privateFunction1,
        publicFunction2: privateFunction2,
        publicFunction3: function(params) {
            // This is okay, but avoid writing long functions within the module's return object

            return new Promise(function(resolve, reject) {
                resolve(params);
            });
        }
    };
})();