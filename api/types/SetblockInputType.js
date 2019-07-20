var g = require('./graphql');

var SetblockInputType = module.exports = new g.GraphQLInputObjectType({
    name: 'SetblockInput',

    fields: function () {
        return {
            blockFraction: {
                type: g.GraphQLFloat
            },
            funded: {
                type: g.GraphQLString
            },
            issueUrl: {
                type: g.GraphQLString
            },
            description: {
                type: g.GraphQLString
            }
        };
    }
});