// So many utility functions (https://lodash.com/docs)
var _ = require('lodash');

var team = module.exports = (function() {

    const fetchAllTeamMembers = function (params) {
        return new Promise(function(resolve, reject) {
            resolve([
                {
                    id: '00000001',
                    name: 'Quinn Pruitt'
                },
                {
                    id: '00000002',
                    name: 'Oscar Lafarga'
                },
                {
                    id: '00000003',
                    name: 'David Lafarga'
                },
                {
                    id: '00000004',
                    name: 'Victoria Lafarga'
                }
            ])
        });
    };

    const fetchTeamMemberById = function (params) {
        return new Promise(function (resolve, reject) {
            // Fetch from AirTable API handler
            
            resolve(
                {
                    id: '00000000',
                    name: 'Sample Team Member'
                }
            )
        });
    };

    return {
        fetchAllTeamMembers,
        fetchTeamMemberById
    };
})();