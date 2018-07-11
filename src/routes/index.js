import Router from 'koa-router';
import logger from '../logger';

const router = new Router();

router.get(`/`, ctx => {
  logger.debug('Hit default endpoint');
  ctx.body = 'Hello World!';
});

router.get(`/error`, () => {
  throw new Error('Internal Server Error');
});

export default router;
