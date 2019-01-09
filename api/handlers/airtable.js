const Airtable = require('airtable')
const {
    AIRTABLE
} = require('../config/credentials')

const base = new Airtable({
    apiKey: AIRTABLE.API_KEY
}).base(AIRTABLE.BASE_ID)

const airtable = module.exports = (function () {

    const createRecord = (params) => {
        return new Promise((resolve, reject) => {
            
            base(params.tableName)
            .create({
                ...params.fieldData
            }, function(err, record) {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(record)
                }
            });
        });
    };

    const deleteRecord = (params) => {
        return new Promise((resolve, reject) => {
            
            base(params.tableName)
            .destroy(
                params.recordId,
                function(err, record) {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        resolve(record)
                    }
                }
            );
        });
    };

    const fetchBaseRecords = (params) => {
        return new Promise((resolve, reject) => {
            let baseRecords = []
            
            base(params.tableName)
            .select({
                maxRecords: params.maxRecords || 20,
                view: params.viewName
            })
            .eachPage((records, fetchNextPage) => {
                records.forEach((record) => {
                    baseRecords.push(record)
                });

                fetchNextPage();
            }, function done(err) {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(baseRecords)
                }
            });
        });
    };

    const fetchFilteredRecords = (params) => {
        return new Promise((resolve, reject) => {
            let baseRecords = []
            
            base(params.tableName)
            .select({
                filterByFormula: params.filterFormula,
                maxRecords: params.maxRecords || 20,
                sort: params.sort || [{ field: 'Date', direction: 'asc' }],
                view: params.viewName,
            })
            .eachPage((records, fetchNextPage) => {
                records.forEach((record) => {
                    baseRecords.push(record)
                });

                fetchNextPage();
            }, function done(err) {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(baseRecords)
                }
            });
        });
    };

    const fetchTableRecord = (params) => {
        return new Promise((resolve, reject) => {
            base(params.tableName)
            .find(
                params.recordId,
                (err, record) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        resolve(record)
                    }
                }
            );
        });
    };

    const updateRecord = (params) => {
        return new Promise((resolve, reject) => {
            
            base(params.tableName)
            .update(
                params.recordId,
                {
                    ...params.updatedFieldData
                },
                function(err, record) {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        resolve(record)
                    }
                }
            );
        });
    };

    return {
        createRecord,
        deleteRecord,
        fetchBaseRecords,
        fetchFilteredRecords,
        fetchTableRecord,
        updateRecord
    };

})();