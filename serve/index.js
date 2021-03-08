const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const router =  new Router();
const app = new Koa();

app.use(static('./public'));
app.use(bodyParser());

router.post('/list', (ctx) => {
    ctx.boody = [1, 2, 3, 4]
})
router.get('/data', (ctx) => {
    ctx.body = { name: 'yunfei' }
})
app.use(router.routes());
app.listen(3001,(err)=>{
    console.log('http://localhost:3001 服务以开启')
})