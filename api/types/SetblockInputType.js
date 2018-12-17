var g = require('./graphql');

var SetblockInputType = module.exports = new g.GraphQLInputObjectType({
    name: 'SetblockInput',

    fields: function () {
        return {
            blockFraction: {
                type: g.GraphQLFloat
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