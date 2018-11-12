var Bookshelf = require('./bookshelf');

var SampleModel = Bookshelf.Model.extend({
    tableName: 'name_of_database_table'
});


module.exports = Bookshelf.model('SampleModel', SampleModel);
