const Router = require('koa-router')

/**
 * @description user API 路由
 * @author 王童孟
 */

const router = require('koa-router')()

router.prefix('/api/user')

// 注册路由
router.post('register', async (ctx, next) => {
  const { userName } = ctx.request.body
})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {

})

module.exports = router
