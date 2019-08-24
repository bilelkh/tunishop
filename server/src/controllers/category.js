const Category = require("../models/category");

exports.createCategory = async(req, res, next) => {

    const category = new Category(req.body);
    await category
        .save()
        .then(result => {
            res.status(201).json({
                succes: "add",
                message: "category created successfully"
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getCategoryById = async(req, res, next) => {
    await Category.findById(req.params.categoryId)
        .then(category => {
            if (!category) {
                const error = new Error("Could not find category.");
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json(category);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getCategory = async(req, res, next) => {
    var query = {};
    if (req.query.page && req.query.pageSize) {
        var page = parseInt(req.query.page);
        var pageSize = parseInt(req.query.pageSize);
        query.skip = pageSize * (page - 1);
        query.limit = pageSize;
        var totalItem = await Category.count({});
    }
    await Category.find({}, {}, query)
        .select("_id title icon")
        .then(categorys => {
            if (!categorys) {
                const error = new Error("Could not find category.");
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ totalItem: totalItem, categorys: categorys });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateCategory = async(req, res, next) => {
    Category.findOneAndUpdate({ _id: req.params.categoryId },
        req.body, { new: true },
        (err, result) => {
            if (err) {
                res.send(err);
            }
            res.json(result);
        }
    );
};

exports.deleteCategory = async(req, res, next) => {
    Category.remove({ _id: req.params.categoryId }, (err, category) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: "Successfully deleted category" });
    });
};

exports.searchCategory = async(req, res, next) => {
    var query = {};
    var page = parseInt(req.query.page);
    var pageSize = parseInt(req.query.pageSize);
    query.skip = pageSize * (page - 1);
    query.limit = pageSize;
    var totalItem = await Category.count({});
    await Category.find({}, { "$text": { "$search": "tv" } }, query)
        .select("_id title")
        .then(categorys => {
            console.log("categorys", categorys)
            if (!categorys) {
                const error = new Error("Could not find category.");
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ totalItem: totalItem, categorys: categorys });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};