
/**
 * 统一响应管理
 * resultCode: 1 成功
 * resultCode: 其他 失败
 * */
module.exports.response = {
    RESFAIL: function (msg) {
        return {resultCode:0,msg:msg || '操作失败',success:false,data:null}
    },
    SUCCESS: function (msg) {
        return {resultCode:1,msg:msg || '操作成功',success:true,data:null}
    },
    SERVERERROR: function (msg) {
        return {resultCode:500,msg:msg || '服务器异常。。。',success:false,data:null}
    },
};

/**
 * 登录权限过滤器
 * @req 请求信息
 * */
module.exports.authLoginFilter = function (req) {
    if(!req.session.isLogin) return {resultCode:8081,msg:'请登录',success:false}
    return null
}