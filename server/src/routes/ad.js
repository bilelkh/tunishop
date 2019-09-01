const express = require('express');
const adController = require('../controllers/ad');
const router = express.Router();
// GET /ad/ads
router.post('/ads', adController.createAd);
router.get('/ads/', adController.getAds);
router.get('/ad/:adId', adController.getAdById);
router.put('/ads/:adId', adController.updateAd);
router.delete('/ad/:adId', adController.deleteAd);

module.exports = router;