const Ad = require("../models/ad");

exports.createAd = async (req, res, next) => {

  const ad = new Ad(req.body);
  await ad
    .save(req)
    .then(result => {
      res.status(201).json({
        succes: "add",
        message: "ad created successfully"
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getAdById = async (req, res, next) => {
  await Ad.findById(req.params.adId)
    .then(ad => {
      if (!ad) {
        const error = new Error("Could not find ad.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json(ad);
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getAds = async (req, res, next) => {
  var query = {};
  if (req.query.page && req.query.pageSize) {
    var page = parseInt(req.query.page);
    var pageSize = parseInt(req.query.pageSize);
    query.skip = pageSize * (page - 1);
    query.limit = pageSize;
    var totalItem = await Ad.count({});
  }
  await Ad.find({}, {}, query)
    .then(ads => {
      if (!ads) {
        const error = new Error("Could not find ad.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ totalItem: totalItem, ads: ads });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateAd = async (req, res, next) => {
  Ad.findOneAndUpdate(
    { _id: req.params.adId },
    req.body,
    { new: true },
    (err, result) => {
      if (err) {
        res.send(err);
      }
      res.json(result);
    }
  );
};

exports.deleteAd = async (req, res, next) => {
  Ad.remove({ _id: req.params.adId }, (err, ad) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Successfully deleted ad" });
  });
};
