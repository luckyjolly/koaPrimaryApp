const Router = require('koa-router');
import demoController from '../api/DemoController';

const router = new Router();

router.get('/demo', demoController.demo);

// module.exports = router;
export default router;
