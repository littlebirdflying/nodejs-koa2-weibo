const Router = require('koa-router')

/**
 * @description user API 路由
 * @author 王童孟
 */

const router = require('koa-router')()
const { isExist, register, login, deleteCurUser } = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const { loginCheck } = require('../../middlewares/loginChecks')

router.prefix('/api/user')

// 注册路由
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  ctx.body = await register({
    userName, 
    password, 
    gender
  })
})

// 登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await login(ctx, userName, password)
})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

// 删除
router.post('/delete', loginCheck, async (ctx, next) => {
  if (isTest) {
    // 测试环境下，测试账号登陆之后，删除自己
    const { userName } = ctx.session.userInfo
    ctx.body = await deleteCurUser(userName)
  }
})

module.exports = router
