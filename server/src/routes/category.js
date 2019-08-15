const express = require('express');
const categoryController = require('../controllers/category');
const router = express.Router();
// GET /category/categorys
router.post('/category', categoryController.createCategory);
router.get('/category/', categoryController.getCategory);
router.get('/category/:categoryId', categoryController.getCategoryById);
router.put('/category/:categoryId', categoryController.updateCategory);
router.delete('/category/:categoryId', categoryController.deleteCategory);
router.get('/searchCategory/', categoryController.searchCategory);

module.exports = router;