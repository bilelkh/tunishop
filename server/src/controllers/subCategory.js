const SubCategory = require("../models/subCategory");

exports.createSubCategory = (req, res, next) => {
  console.log("createSubCategory", req.body);

  const subCategory = new SubCategory(req.body);
  subCategory
    .save()
    .then(result => {
      console.log("result", result);
      res.status(201).json({
        message: "subCategory created successfully"
      });
    })
    .catch(err => {
      console.log("err", err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getSubCategoryById = (req, res, next) => {
  SubCategory.findById(req.params.subCategoryId)
    .then(subCategory => {
      if (!subCategory) {
        const error = new Error("Could not find subCategory.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json(subCategory);
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getSubCategory = async (req, res, next) => {
  var page = parseInt(req.query.page);
  var pageSize = parseInt(req.query.pageSize);
  var query = {};
  query.skip = pageSize * (page - 1);
  query.limit = pageSize;
  var totalItem = await SubCategory.countDocuments({});
  SubCategory.find({})
    .select("_id title category")
    .then(subCategory => {
      if (!subCategory) {
        const error = new Error("Could not find subCategory.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ totalItem: totalItem, subCategorys: subCategory });
    })
    .catch(err => {
      console.log("err", err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateSubCategory = (req, res, next) => {
  SubCategory.findOneAndUpdate(
    { _id: req.params.subCategoryId },
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

exports.deleteSubCategory = (req, res, next) => {
  SubCategory.remove({ _id: req.params.subCategoryId }, (err, subCategory) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Successfully deleted subCategory" });
  });
};

exports.subCategoryByIdCategory = (req, res, next) => {
  console.log("req.params.categoryId",req.params.categoryId)
    SubCategory.find({'category._id' : req.params.categoryId}).then(subCategory => {
            if (!subCategory) {
                const error = new Error('Could not find subCategory.');
                error.statusCode = 404;
                throw error;
            }
            console.log("subCategory",subCategory)
            res.status(200).json(subCategory);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
