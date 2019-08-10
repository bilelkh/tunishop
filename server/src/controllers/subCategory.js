

const subCategory = require('../models/subCategory');



exports.createSubCategory = (req, res, next) => {
    const subCategory = new subCategory(req.body);
    subCategory.save().then(result => {
            res.status(201).json({message:"subCategory created successfully"
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};




exports.getSubCategoryById = (req, res, next) => {
    SubCategory.findById(req.params.subCategoryId).then(subCategory => {
            if (!subCategory) {
                const error = new Error('Could not find subCategory.');
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




exports.getSubCategory = (req, res, next) => {
    SubCategory.find({}).select("_id title").then(subCategory => {
            if (!subCategory) {
                const error = new Error('Could not find subCategory.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json( subCategory);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};




exports.updateSubCategory = (req, res, next) => {
    SubCategory.findOneAndUpdate({ _id: req.params.subCategoryId }, req.body, { new: true }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json(result);
    })
};



exports.deleteSubCategory = (req, res, next) => {
    SubCategory.remove({ _id: req.params.subCategoryId }, (err, subCategory) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted subCategory' });
    })
};


