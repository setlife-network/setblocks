// So many utility functions (https://lodash.com/docs)
var _ = require('lodash');

var schedule = module.exports = (function () {

    const createSetblock = function (params) {
        return new Promise(function (resolve, reject) {
            resolve('In progress')
        });
    };
    
    
    const deleteSetblock = function (params) {
        return new Promise(function (resolve, reject) {
            resolve('In progress')
        });
    };

    const updateSetblock = function (params) {
        return new Promise(function(resolve, reject) {
            resolve('In progress')
        });
    };

    return {
        createSetblock,
        deleteSetblock,
        updateSetblock
    };
})();