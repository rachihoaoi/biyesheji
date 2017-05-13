var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
    identity: 'user',
        tableName: 'user_info',
        connection: "mysql",
        attributes: {
        id: {
            type: 'integer',
            unique: true,
            primaryKey: true,
            columnName: 'user_id',
            autoIncrement: true
        },

        name: {
            type: 'string',
            columnName: 'user_name'
        },

        password: {
            type: 'string',
            columnName: 'user_password'
        },

        info: {
            type: 'string',
            columnName: 'user_info'
        },

        tel: {
            type: 'string',
            columnName: 'user_tel'
        },

        icon: {
            type: 'string',
            columnName: 'user_icon'
        },

        status: {
            type: 'string',
            columnName: 'user_status'
        },

        addr: {
            type: 'string',
            columnName: 'user_addr'
        }
    },
    autoCreatedAt: false,
    autoUpdatedAt: false
});