const Router = require('koa-router');
import PublicController from '../api/PublicController';

const router = new Router();

router.prefix('/public');
router.get('/getCaptcha', PublicController.getCaptcha);

// module.exports = router;
export default router;
