var express = require('express');
var router = express.Router();
var expressSession = require('express-session')

// 配置
router.use(expressSession({
    secret: 'e-encryption', // md5加密存储
    name: 'sessionid',
    resave: false, // 客户端并行请求是否覆盖:true-是,false-否
    saveUninitialized: true, // 初始化session存储
    rolling: true,
    cookie: {
        httpOnly: true, maxAge: 1000 * 60 * 60 * 8 // 8小时过期
    }
}))


// 设置路由拦截
var whitePath = ['/login.html', '/register.html'] // 不需要登录的白名单
router.use(function (req, res, next) {
    if (req.method.toLocaleLowerCase()==='get' && req.path.endsWith('.html') && whitePath.indexOf(req.path) === -1) {
        console.log('路由拦截器', req.method)
        if (!req.session.isLogin) return res.redirect('/login.html')
    }
    // 其他则匹配下一步
    next()
})

// router.get('/', function (req, res, next) {
//     res.render('index', {title: 'Express'});
// });

module.exports = router;
