var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
    identity: 'notification',
    tableName: 'notification_info',
    connection: "mysql",
    attributes: {
        id: {
            type: 'integer',
            unique: true,
            primaryKey: true,
            columnName: 'notification_id',
            autoIncrement: true
        },

        from: {
            type: 'integer',
            columnName: 'notification_from_id'
        },

        fromName: {
            type: 'string',
            columnName: 'notification_from'
        },

        to: {
            type: 'integer',
            columnName: 'notification_to_id'
        },

        toName: {
            type: 'string',
            columnName: 'notification_to'
        },

        title: {
            type: 'string',
            columnName: 'notification_title'
        },

        message: {
            type: 'string',
            columnName: 'notification_message'
        },

        time: {
            type: 'string',
            columnName: 'notification_time'
        },

        checked: {
            type: 'string',
            columnName: 'notification_checked'
        }
    },
    autoCreatedAt: false,
    autoUpdatedAt: false
});　