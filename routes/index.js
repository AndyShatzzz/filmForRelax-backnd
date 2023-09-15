const router = require('express').Router();

const auth = require('../middlewares/auth');
const { signup, signIn } = require('../controllers/users');
const { validateSignup, validateSignIn } = require('../middlewares/validation');

router.post('/signup', validateSignup, signup);
router.post('/signin', validateSignIn, signIn);

router.use('/users', auth, require('./users'));
router.use('/movies', auth, require('./movies'));

module.exports = router;
