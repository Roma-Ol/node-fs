const express = require('express');
const router = express.Router();
const asyncWrapper = require('../utils/asyncWrapper')
const { registerHandler, getMovieByIdHandler, loginHandler } = require('../controllers/authControllers');
const { validateUserCreate, validateUserLogin } = require('../middlewares/userValidate');

router.post('/register', validateUserCreate, asyncWrapper(registerHandler));
router.post('/login', validateUserLogin, asyncWrapper(loginHandler));

module.exports = router;