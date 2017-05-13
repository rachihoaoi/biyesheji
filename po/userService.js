var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
    identity: 'user_service',
    tableName: 'user_service_info',
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

        sid: {
            type: 'integer',
            columnName: 'service_id'
        },

        action: {
            type: 'string',
            columnName: 'action'
        }
    },
    autoCreatedAt: false,
    autoUpdatedAt: false
});