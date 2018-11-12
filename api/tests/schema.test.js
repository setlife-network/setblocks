const fs = require('fs-extra');
const _ = require('lodash');

const contact = require('../modules/contact');

const schema = require('../schema')

const mutations = schema._mutationType._fields
const queries = schema._queryType._fields

_.map(mutations, m => {
    test('Mutation ' + m.name + ' has no runtime errors', () => {
        const defaultArguments = m.args.reduce((object, a) => {
            object[a.name] = a.defaultValue
            return object
        }, {})

        return (
            m.resolve({}, defaultArguments)
            .then(result => {
                expect(result).toBeDefined()
            })
        )
    });
})

_.map(queries, m => {
    test('Query ' + m.name + ' has no runtime errors', () => {
        const defaultArguments = m.args.reduce((object, a) => {
            object[a.name] = a.defaultValue
            return object
        }, {})
        
        return (
            m.resolve({}, defaultArguments)
            .then(result => {
                expect(result).toBeDefined()
            })
        )
    });
})