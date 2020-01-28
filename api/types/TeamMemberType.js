var g = require('./graphql');
const moment = require('moment')

const airtable = require('../handlers/airtable')

var TeamMemberType = module.exports = new g.GraphQLObjectType({
    name: 'TeamMember',
    description: 'This is an example showing how to create GraphQL Type objects for our data models',
    fields: function() {
        return {
            id: {
                type: g.GraphQLString
            },
            name: {
                type: g.GraphQLString
            },

            weeklySetblocks: {
                type: new g.GraphQLList(SetblockType),
                description: 'Returns the current week\'s SetBlocks for this TeamMember, starting from the 1st Setblock on Monday to the last Setblock on Sunday',
                resolve: (rootModel) => {
                    return new Promise((resolve, reject) => {

                        // Offset 1 day before start and 1 day after end 
                        // for moment-airtable date parsing compatibility
                        const startOfWeek = moment().startOf('week').format('M/D/YYYY h:mm a')
                        const endOfWeek = moment().endOf('week').add(1, 'days').format('M/D/YYYY h:mm a')

                        airtable.fetchFilteredRecords({
                            filterFormula: `AND(
                                IS_AFTER({Date}, DATETIME_PARSE('${startOfWeek}', 'M/D/YYYY h:mm a')),
                                IS_BEFORE({Date}, DATETIME_PARSE('${endOfWeek}', 'M/D/YYYY h:mm a'))
                            )`,
                            tableName: 'Scheduling',
                            viewName: 'All'
                        })
                        .then(records => {
                            const setblocks = records.reduce((array, r, i) => {
                                if (r.fields.Member[0] == rootModel.id) {
                                    array.push({
                                        id: r.id,
                                        date: r.fields.Date,
                                        blockTime: r.fields.Blocktime,
                                        blockFraction: r.fields.Blocks,
                                        funded: r.fields.Funded,
                                        issueUrl: r.fields.Issue,
                                        description: r.fields.Description
                                    })
                                }
                                return array
                            }, [])
                            resolve(setblocks)
                        })
                    })
                }
            }
        };
    }
});

var SetblockType = require('./SetblockType')