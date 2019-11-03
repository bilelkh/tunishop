const express = require('express');
const subCategoryController = require('../controllers/subCategory');
const router = express.Router();
const checkAuth = require('../../middleware/is-auth');

router.post('/subCategory',checkAuth, subCategoryController.createSubCategory);
router.get('/subCategory/',checkAuth, subCategoryController.getSubCategory);
router.get('/subCategoryByIdCategory/:categoryId',checkAuth, subCategoryController.subCategoryByIdCategory);
router.get('/subCategory/:subCategoryId',checkAuth, subCategoryController.getSubCategoryById);
router.put('/subCategory/:subCategoryId',checkAuth, subCategoryController.updateSubCategory);
router.delete('/subCategory/:subCategoryId',checkAuth, subCategoryController.deleteSubCategory);

module.exports = router;