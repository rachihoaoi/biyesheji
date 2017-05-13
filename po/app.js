var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
    identity: 'app',
    tableName: 'app_info',
    connection: "mysql",
    attributes: {
        id: {
            type: 'integer',
            unique: true,
            primaryKey: true,
            columnName: 'id',
            autoIncrement: true
        },

        did: {
            type: 'int',
            columnName: 'app_developer_id'
        },

        appName: {
            type: 'string',
            columnName: 'app_name'
        },

        appDeveloper: {
            type: 'string',
            columnName: 'app_developer'
        },

        appOS: {
            type: 'string',
            columnName: 'app_system'
        },

        appType: {
            type: 'string',
            columnName: 'app_type'
        },

        appVersion: {
            type: 'string',
            columnName: 'app_version'
        },

        appLanguage: {
            type: 'string',
            columnName: 'app_language'
        },

        appInfo: {
            type: 'string',
            columnName: 'app_info'
        },

        appPic1: {
            type: 'string',
            columnName: 'app_pic1'
        },

        appPic2: {
            type: 'string',
            columnName: 'app_pic2'
        },

        appPic3: {
            type: 'string',
            columnName: 'app_pic3'
        },
        appIcon: {
            type: 'string',
            columnName: 'app_icon'
        },
        appFile: {
            type: 'string',
            columnName: 'app_file_location'
        },

        appDownload: {
            type: 'string',
            columnName: 'app_download'
        },

        rating:{
            type:'int',
            columnName :'app_rating'
        },

        ratingNum:{
            type:'int',
            columnName :'app_rating_num'
        },

        status: {
            type: 'string',
            columnName: 'status'
        },
    },
    autoCreatedAt: false,
    autoUpdatedAt: false
});