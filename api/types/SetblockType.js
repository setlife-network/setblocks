var g = require('./graphql');

var SetblockType = module.exports = new g.GraphQLObjectType({
    name: 'Setblock',
    description: 'A setblock makes up one unit of a team member\'s schedule',
    fields: function() {
        return {
            id: {
                type: g.GraphQLString
            },
            date: {
                type: g.GraphQLString
            },
            blockTime: {
                type: g.GraphQLString,
                description: 'One of 5 designated times for each day. Should only be one of the following exact formats: `Setblock 1 (12am - 4am)`, `Setblock 2 (4:30am - 8:30am)`, `Setblock 3 (9am - 1pm)`, `Setblock 4 (1:30pm - 5:30pm)`, `Setblock 5 (6pm - 10pm)`'
            },
            blockFraction: {
                type: g.GraphQLFloat,
                description: 'Must be either 1.0 or 0.5'
            },
            issueUrl: {
                type: g.GraphQLString,
                description: 'A reference to the GitHub isssue being worked on during this setblock'
            },
            description: {
                type: g.GraphQLString,
                description: 'A brief description of the work being performed during this setblock if no issueUrl is provided'
            },
            teamMember: {
                type: types.TeamMemberType,
                description: 'The TeamMember who has committed to working this setblock'
            }
        };
    }
});

var TeamMemberType = require('./TeamMemberType')