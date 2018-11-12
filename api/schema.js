var apiModules = require('./modules');
var models = require('./models');
var types = require('./types');

var g = types.graphql;

var apiSchema = new g.GraphQLSchema(
    {
        mutation: new g.GraphQLObjectType({
            name: 'RootMutationType',

            description: 'Endpoints with POST, PUT, and DELETE functionality go here',

            fields: {
                executeRoute: {
                    args: {
                        requiredArgument: {
                            description: 'This argument is required to execute this route',
                            type: new g.GraphQLNonNull(g.GraphQLString)
                        },
                        optionalArgument: {
                            description: 'This argument is not necessary. Be sure to handle null cases.',
                            type: g.GraphQLString
                        }
                    },

                    description: 'A sample mutation route executed. Whenever possible, name mutation routes as a grammatical combination of action verb and direct object. (ex: confirmOrder, sendInvoice, registerCustomer) ',

                    type: g.GraphQLString,

                    resolve: function(root, args) {
                        return apiModules.sampleModule.publicFunction1(args);
                    }
                },
                submitContactForm: {
                    args: {
                        name: {
                            description: 'The name of the person trying to get in touch',
                            type: new g.GraphQLNonNull(g.GraphQLString)
                        },
                        email: {
                            description: 'The email address of the person trying to get in touch',
                            type: new g.GraphQLNonNull(g.GraphQLString)
                        },
                        message: {
                            description: 'The message from the person trying to get in touch',
                            type: new g.GraphQLNonNull(g.GraphQLString)
                        }
                    },

                    description: 'A POST request with information from the Contact Form',

                    type: g.GraphQLString,

                    resolve: function(root, args) {
                        return apiModules.contact.sendEmail(args);
                    }
                }
            }
        }),

        query: new g.GraphQLObjectType({
            name: 'RootQueryType',

            description: 'Endpoints with GET functionality go here',

            fields: {
                sampleModel: {
                    type: types.SampleModelType,
                    description: 'Fetches a data model object by specified properties',
                    args: {
                        id: {
                            description: 'Specify the data model\'s unique ID',
                            type: g.GraphQLLong,
                            defaultValue: 10
                        },
                        property: {
                            description: 'Or allow the client to specify any other properties as needed',
                            type: g.GraphQLString
                        }
                    },

                    resolve: function(root, args) {
                        return apiModules.sampleModule.publicFunction2(args);
                    }
                },

                sampleModels: {
                    type: new g.GraphQLList(types.SampleModelType),
                    description: 'Same as the above query, but returns an array of objects',
                    args: {
                        property: {
                            description: 'If multiple data models match the same specified property, they will all be returned in an array',
                            type: g.GraphQLString
                        }
                    },

                    resolve: function(root, args) {
                        return apiModules.sampleModule.publicFunction3(args);
                    }
                }
            }
        })
    }
);

module.exports = apiSchema;