const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();
const passport = require('passport');
const checkAuth = require('../../middleware/is-auth');

// GET /task/posts
router.post('/signup', userController.signup);
router.post('/signin/', userController.signin);
router.get('/users/', userController.getUsers);
router.get('/profile/',checkAuth, userController.profile);
router.post('/forgot-password/', userController.forgotPassword);
router.post('/changePassword/',checkAuth, userController.changePassword);
router.put('/updateUserData/:userId',checkAuth, userController.updateUserData);

module.exports = router;