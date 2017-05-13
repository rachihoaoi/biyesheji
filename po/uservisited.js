var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
    identity: 'uservisited',
    tableName: 'user_visited_name',
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

        visitedName: {
            type: 'string',
            columnName: 'user_visited_name'
        },

        visitedTime: {
            type: 'datetime',
            columnName: 'user_visited_time'
        }
    },
    autoCreatedAt: false,
    autoUpdatedAt: false,
});　