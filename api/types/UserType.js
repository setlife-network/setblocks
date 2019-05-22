var g = require('./graphql');

var UserType = module.exports = new g.GraphQLObjectType({
    name: 'User',
    description: 'A user',
    fields: function() {
        return {
            id: {
                type: g.GraphQLString
            },
            email: {
                type: g.GraphQLString
            },
            githubUrl: {
                type: g.GraphQLString
            },
            name: {
                type: g.GraphQLString
            }
        };
    }
});

