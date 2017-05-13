/**
 * Created by Amaris on 2016/9/13.
 */

//API接口地址存储文件

exports.response = {
    logoutSuccess: {
        code: "200",
        msg: "退出成功！"
    },
    loginNo: {
        code: "202",
        msg: "用户未登录！"
    }
};

exports.getSuccessRes = function (data, total) {

    var result = {
        code: "200",
        msg: "success"
    };
    if (!!data) {
        result.obj = data;
    }
    if (!!total) {
        result.total = total;
    }
    return result;
};

exports.getErrorRes = function (code, message) {

    return {
        code: code,
        msg: message
    };

};