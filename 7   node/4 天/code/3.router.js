// 1导入express
var express = require('express')
// 2创建路由对像
var router = express.Router()
// 3挂载获取用户列表的路由
router.get('/user/list', function (req, res) {
	res.send('get')
})
// 4挂载  添加 用户的路由
router.post('/user/add', function (req, res) {
	res.send('Add')
})
// 向外到处路由对像
module.exports = router
