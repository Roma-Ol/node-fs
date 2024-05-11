const express = require('express');
const router = express.Router();
const asyncWrapper = require('../utils/asyncWrapper')
const { registerHandler, getMovieByIdHandler, loginHandler, verifyHandler, resendVerificationHandler,
  resetPasswordHandler
} = require('../controllers/authControllers');
const { resendVerificationSchema, createUserSchema, loginUserSchema, resetPasswordSchema } = require('../schemes/userSchema');
const { validateSchema } = require('../middlewares/validateSchema');

router.post('/register', validateSchema(createUserSchema), asyncWrapper(registerHandler));
router.post('/login', validateSchema(loginUserSchema), asyncWrapper(loginHandler));
router.post('/verify', validateSchema(resendVerificationSchema),asyncWrapper(resendVerificationHandler));
router.get('/verify/:code', asyncWrapper(verifyHandler));
router.post('/reset', validateSchema(resetPasswordSchema), asyncWrapper(resetPasswordHandler));

module.exports = router;