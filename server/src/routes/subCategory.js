const express = require('express');
const subCategoryController = require('../controllers/subCategory');
const router = express.Router();

router.post('/subCategory', subCategoryController.createSubCategory);
router.get('/subCategory/', subCategoryController.getSubCategory);
router.get('/subCategory/:subCategoryId', subCategoryController.getSubCategoryById);
router.put('/subCategory/:subCategoryId', subCategoryController.updateSubCategory);
router.delete('/subCategory/:subCategoryId', subCategoryController.deleteSubCategory);

module.exports = router;