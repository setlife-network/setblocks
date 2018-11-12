var g = require('./graphql');

var NestedSampleType = module.exports = new g.GraphQLObjectType({
    name: 'NestedSample',
    description: 'This type object is a property of SampleModelType',
    fields: function() {
        return {
            property1: {
                type: g.GraphQLString
            },
            property2: {
                type: g.GraphQLLong
            }
        };
    }
});