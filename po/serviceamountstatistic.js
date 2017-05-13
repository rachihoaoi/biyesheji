
var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
    identity: 'serviceamountstatistic',
    tableName: 'service_amount_statistic',
    connection: "mysql",
    attributes: {
        id: {
            type: 'integer',
            unique: true,
            primaryKey: true,
            columnName: 'id',
            autoIncrement: true
        },

        time: {
            type: 'datetime',
            columnName: 'time'
        },

        value: {
            type: 'integer',
            columnName: 'value'
        }
    },
    autoCreatedAt: false,
    autoUpdatedAt: false
});　