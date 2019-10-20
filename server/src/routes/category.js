const express = require('express');
const categoryController = require('../controllers/category');
const router = express.Router();
const checkAuth = require('../../middleware/is-auth');

// GET /category/categorys
router.post('/category',checkAuth, categoryController.createCategory);
router.get('/category/',checkAuth, categoryController.getCategory);
router.get('/category/:categoryId',checkAuth, categoryController.getCategoryById);
router.put('/category/:categoryId',checkAuth, categoryController.updateCategory);
router.delete('/category/:categoryId',checkAuth, categoryController.deleteCategory);
router.get('/searchCategory/',checkAuth, categoryController.searchCategory);

module.exports = router;