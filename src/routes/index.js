import Router from 'koa-router';

const router = new Router();

router.get(`/`, ctx => {
  ctx.body = 'Hello World!';
});

router.get(`/error`, () => {
  throw new Error('Internal Server Error');
});

export default router;
