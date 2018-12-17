// So many utility functions (https://lodash.com/docs)
var _ = require('lodash');


var team = module.exports = (function() {
    const airtable = require('../handlers/airtable')

    const fetchAllTeamMembers = function (params) {
        return new Promise(function(resolve, reject) {
            airtable.fetchBaseRecords({
                tableName: 'Team',
                viewName: 'All'
            })
            .then(records => {
                const teamMembers = records.map(r => {
                    return {
                        id: r.id,
                        name: r.fields.Name
                    }
                })
                resolve(teamMembers)
            })
        });
    };

    const fetchTeamMemberById = function (params) {
        return new Promise(function (resolve, reject) {
            
            airtable.fetchTableRecord({
                tableName: 'Team',
                recordId: params.id
            })
            .then(record => {
                resolve({
                    id: record.id,
                    name: record.fields.Name
                })
            })
        });
    };

    return {
        fetchAllTeamMembers,
        fetchTeamMemberById
    };
})();