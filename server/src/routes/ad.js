const express = require('express');
const adController = require('../controllers/ad');
const router = express.Router();
// GET /ad/ads
router.post('/ad', adController.createAd);
router.get('/ad/', adController.getAds);
router.get('/ad/:adId', adController.getAdById);
router.put('/ad/:adId', adController.updateAd);
router.delete('/ad/:adId', adController.deleteAd);

module.exports = router;