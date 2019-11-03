const express = require('express');
const adController = require('../controllers/ad');
const router = express.Router();
const checkAuth = require('../../middleware/is-auth');

// GET /ad/ads
router.post('/ad',checkAuth, adController.createAd);
router.get('/ads/', adController.getAds);
router.get('/ad/:adId', adController.getAdById);
router.put('/ads/:adId',checkAuth, adController.updateAd);
router.delete('/ad/:adId',checkAuth, adController.deleteAd);

module.exports = router;