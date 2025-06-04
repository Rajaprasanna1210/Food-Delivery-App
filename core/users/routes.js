const router = require('express').Router();
const controller = require('../users/controller')
const { registerSchema, loginSchema } = require('../users/schema');
const validate = require('../../middleware/validate');
const auth = require('../../middleware/auth');

router.post('/register', validate(registerSchema), controller.register);
router.post('/login', validate(loginSchema), controller.login);
router.get('/profile', auth, controller.profile);

module.exports = router;
