var g = require('./graphql');

var SampleModelType = module.exports = new g.GraphQLObjectType({
    name: 'SampleModel',
    description: 'This is an example showing how to create GraphQL Type objects for our data models',
    fields: function() {
        return {
            id: {
                type: g.GraphQLString
            },
            property: {
                type: g.GraphQLString
            },
            requiredProperty: {
                type: new g.GraphQLNonNull(g.GraphQLString),
                description: 'Document properties with descriptions when usage is not obvious'
            },
            propertyWithMoreProperties: {
                type: NestedSampleType
            }
        };
    }
});

var NestedSampleType = require('./NestedSampleType');