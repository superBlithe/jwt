const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const jsonwebtoken = require("jsonwebtoken");
const jwt = require("koa-jwt");

var app = new Koa();
var router = new Router();
app.use((ctx, next) => {
  return next().catch(err => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = "没有权限，清先登录";
    } else {
      throw err;
    }
  });
});

app.use(bodyParser());
app.use(
  jwt({ secret: "token" }).unless({
    path: [/^\/login/]
  })
);

router.get("/userInfo", ctx => {
  ctx.body = {
    uid: 1,
    city: "hangzhou"
  };
});

router.post("/login", (ctx, next) => {
  var data = ctx.request.body;
  if (!data.nickname || !data.password) {
    ctx.body = {
      success: false,
      msg: "请输入用户名和密码"
    };
  } else {
    // 登录验证
    const token = jsonwebtoken.sign({ nickname: data.nickname }, "token", {
      expiresIn: '1h'
    });
    ctx.body = {
      success: true,
      msg: "登录成功",
      token
    };
  }
});
app.use(router.routes());
app.listen(4444, () => {
  console.log("app run http://localhost:4444");
});
