// So many utility functions (https://lodash.com/docs)
var _ = require('lodash');

var schedule = module.exports = (function () {
    const { fetchTeamMemberById } = require('./team')

    const airtable = require('../handlers/airtable')

    const createSetblock = function (params) {
        return new Promise(function (resolve, reject) {
            airtable.createRecord({
                tableName: 'Scheduling',
                fieldData: {
                    Date: params.date,
                    Member: [
                        params.teamMemberId
                    ],
                    Blocktime: params.blockTime,
                    Blocks: params.blockFraction,
                    Issue: params.issueUrl || '',
                    Description: params.description || ''
                }
            })
            .then(newSetBlock => {
                return fetchTeamMemberById({ id: params.teamMemberId })
            })
            .then(resolve)
            .catch(reject)
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