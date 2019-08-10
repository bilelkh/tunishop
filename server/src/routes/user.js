const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// GET /task/posts
router.post('/signup', userController.signup);
router.post('/signin/', userController.signin);
router.get('/profile/', passport.authenticate('jwt', { session: false }), userController.profile);
router.post('/forgot-password/', userController.forgotPassword);

module.exports = router;