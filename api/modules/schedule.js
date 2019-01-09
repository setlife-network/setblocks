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
            airtable.deleteRecord({
                tableName: 'Scheduling',
                recordId: params.setblockId
            })
            .then(() => {
                resolve('Deleted Setblock: ' + params.setblockId)
            })
            .catch(reject)
        });
    };

    const updateSetblock = function (params) {
        return new Promise(function(resolve, reject) {
            const { setblockId, updatedFields } = params
            let updatedFieldData = {}
            Object.keys(updatedFields).map(k => {
                if (k == 'blockFraction') updatedFieldData['Blocks'] = updatedFields[k]
                if (k == 'issueUrl') updatedFieldData['Issue'] = updatedFields[k]
                if (k == 'description') updatedFieldData['Description'] = updatedFields[k]
            })

            airtable.updateRecord({
                tableName: 'Scheduling',
                recordId: setblockId,
                updatedFieldData
            })
            .then(record => {
                resolve('Updated Setblock: ' + setblockId)
            })
            .catch(reject)
        });
    };

    return {
        createSetblock,
        deleteSetblock,
        updateSetblock
    };
})();