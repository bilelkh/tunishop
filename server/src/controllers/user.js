const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const async = require("async");
const crypto = require("crypto");
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');



exports.signup = (req, res, next) => {
    let newUser = new User(req.body);
    console.log("newUser", newUser);
    addUser(newUser, (err, user) => {
        if (err) {
            console.log("err", err)
            res.json({ success: false, msg: 'Failed to register user' });
        } else {
            res.json({ success: true, msg: 'User registered' });
        }
    });
};
// Authenticate
exports.signin = (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) { console.log("===error===", err) }
        if (!user) {
            console.log("===user===", user)
            return res.json({ success: false, msg: 'WRONG EMAIL' });
        }
        comparePassword(req.body.password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({ data: user }, "2k19", {
                    expiresIn: '1h' 
                });
                console.log("token",token)
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.firstName,
                        username: user.username,
                        email: user.email,
                        authorization: user.authorization

                    }
                })
            } else {
                return res.json({ success: false, msg: 'WRONG PASSWORD' });
            }
        });
    });
};

exports.profile = (req, res, next) => {
    con
    res.json({ user: req.user });
};

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.forgotPassword = function(req, res) {
    async.waterfall([
        function(callback) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                callback(err, token);
            });
        },
        function(token, callback) {
            User.findOne({ email: req.body.email }).then(function(user) {
                if (!user) {
                    return res.send({ error: 'No account with that email address exists.' });
                }
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
                req.user = user;
                user.save(function(err) {
                    callback(err, token, user);
                })
            });
        },
        function(token, user, callback) {
            var smtpTransport = nodemailer.createTransport({ sendmail: true }, sendgridTransport({
                auth: {
                    api_key: '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'
                }
            }));

            console.log("===req.body.email===", req.body.email)
            var mailOptions = {
                to: req.body.email,
                from: 'bilel.khadhraoui@esprit.tn',
                subject: 'Node.js Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://localhost:4200/reset-password/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            console.log("===mailOptions===", mailOptions)
            smtpTransport.sendMail(mailOptions, function(err) {
                console.log('==error==', err)
                callback(err, 'done');
            });
        }
    ], function(err) {
        if (err) return next(err);
        console.log("==err==", err)
        res.send({ success: true, msg: "Email send successfully", user: req.user })
    });
}

module.exports.reset = function(req, res) {
    async.waterfall([
        function(done) {
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
                if (!user) {
                    console.log("error", err);
                    return res.redirect('back');
                }

                user.password = "req.body.password";
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                user.save(function(err) {
                    req.logIn(user, function(err) {
                        callback(err, user);
                    });
                });
            });
        },
        function(user, callback) {
            var smtpTransport = nodemailer.createTransport('SMTP', {
                service: 'SendGrid',
                auth: { api_key: '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' }
            });
            var mailOptions = {
                to: "bilel1996k@gamil.com",
                from: 'falti@gmail.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + "user.email" + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                req.flash('success', 'Success! Your password has been changed.');
                callback(err);
            });
        }
    ], function(err) {
        console.log("error", err)
    });
}

exports.changePassword = (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        console.log("===user===", user)
        if (err) {
            res.status(404).json({ err: err });

        }
        comparePassword(req.body.currentPassword, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
          

                if (checkIfEqual(req.body.newPassword, req.body.confirmNewPassword)) {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
                            if (err) throw err;
                            User.updateOne({email : req.body.email }, {password:hash}, (err, result) => {
                                if (err) throw err;
                                return   res.status(200).json({success: true, msg: 'PASSWIRD UPDATED SUCCESFULLY ' });
                              });
                        });
                    });
                }
                else
                {
                    return res.json({ success: false, msg: 'PASSWORDS NOT EQUALS' });
                }


            } else {
                return res.json({ success: false, msg: 'WRONG PASSWORD' });
            }
        });
    });





    // let newUser = new User(req.body);
    // console.log("newUser", newUser);
    // addUser(newUser, (err, user) => {
    //     if (err) {
    //         console.log("err", err)
    //         res.json({ success: false, msg: 'Failed to register user' });
    //     } else {
    //         res.json({ success: true, msg: 'User registered' });
    //     }
    // });
};

exports.getUsers = async(req, res, next) => {

    var query = {};
    if (req.query.page && req.query.pageSize) {
        var page = parseInt(req.query.page);
        var pageSize = parseInt(req.query.pageSize);
        query.skip = pageSize * (page - 1);
        query.limit = pageSize;
        var totalItem = await User.count({});
    }
    await User.find({ 'authorization': 'user' }, {}, query).select("_id email lastName firstName createdAt")
        .then(users => {
            if (!users) {
                const error = new Error("Could not find users.");
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ totalItem: totalItem, users: users });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};




exports.updateUserData = async(req, res, next) => {
    User.findOneAndUpdate({ _id: req.params.userId },
        req.body, { new: true },
        (err, result) => {
            if (err) {
                res.send(err);
            }
            res.json(result);
        }
    );
};











const addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}


const comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}

const checkIfEqual = function(newPassword, confirmNewPassword) {
    return newPassword === confirmNewPassword;
}
