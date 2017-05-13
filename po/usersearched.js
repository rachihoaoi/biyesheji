var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
    identity: 'usersearched',
    tableName: 'user_search_keyword',
    connection: "mysql",
    attributes: {
        id: {
            type: 'integer',
            unique: true,
            primaryKey: true,
            columnName: 'id',
            autoIncrement: true
        },

        uid: {
            type: 'integer',
            columnName: 'user_id'
        },

        searchKeyword: {
            type: 'string',
            columnName: 'search_keyword'
        },

        serachTime: {
            type: 'datetime',
            columnName: 'serach_time'
        }
    },
    autoCreatedAt: false,
    autoUpdatedAt: false,
});　