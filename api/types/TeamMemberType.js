var g = require('./graphql');

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

            // weeklySetblocks: {
            //     type: g.GraphQLList(SetblockType),
            //     description: 'Returns the current week\'s SetBlocks for this TeamMember, starting from the 1st Setblock on Monday to the last Setblock on Sunday',
            //     resolve: () => {
            //         return new Promise((resolve, reject) => {
            //             resolve([
            //                 {
            //                     date: '01-01-2019',
            //                     blocktime: 'Setblock 1 (12am - 4am)',
            //                     blockFraction: 0.5,
            //                     description: 'Sample work description'
            //                 }
            //             ])
            //         })
            //     }
            // }
        };
    }
});

var SetblockType = require('./SetblockType')