const router = require('express').Router();

const { getUserInfo, patchUserInfo } = require('../controllers/users');
const { validatePatchUserInfo } = require('../middlewares/validation');

router.get('/me', getUserInfo);
router.patch('/me', validatePatchUserInfo, patchUserInfo);

module.exports = router;
