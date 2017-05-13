var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
    identity: 'service',
    tableName: 'service_info',
    connection: "mysql",
    attributes: {
        id: {
            type: 'integer',
            unique: true,
            primaryKey: true,
            columnName: 'service_id',
            autoIncrement: true
        },
        name: {
            type: 'string',
            columnName: 'service_name'
        },

        address: {
            type: 'string',
            columnName: 'service_address'
        },

        developer: {
            type: 'string',
            columnName: 'service_developer'
        },

        developerID: {
            type: 'string',
            columnName: 'service_developer_id'
        },

        requestMethod: {
            type: 'string',
            columnName: 'service_request_method'
        },

        info: {
            type: 'string',
            columnName: 'service_info'
        },
        returnSample: {
            type: 'string',
            columnName: 'service_return_sample'
        },

        paramType: {
            type: 'string',
            columnName: 'service_param_type'
        },

        paramValue: {
            type: 'string',
            columnName: 'service_param_value'
        },

        bodyParamType: {
            type: 'string',
            columnName: 'service_bodyParam_type'
        },
        vision: {
            type: 'string',
            columnName: 'service_vision'
        },
        apiAddr: {
            type: 'string',
            columnName: 'service_api_address'
        },

        status: {
            type:'string',
            columnName:'service_status'
        }
    },

    autoCreatedAt: false,
    autoUpdatedAt: false
});