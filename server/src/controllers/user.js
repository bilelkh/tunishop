const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const async = require("async");
const crypto = require("crypto");
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
// Register
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
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'WRONG EMAIL' });
        }
        comparePassword(req.body.password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({ data: user }, "FLATI", {
                    expiresIn: 604800 // 1 week
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.firstName,
                        username: user.username,
                        email: user.email
                    }
                })
            } else {
                return res.json({ success: false, msg: 'WRONG PASSWORD' });
            }
        });
    });
};

// Profile
exports.profile = (req, res, next) => {
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
            User.findOne({ email: req.body.email }, function(err, user) {
                if (!user) {
                    res.send({ error: 'No account with that email address exists.' });
                }
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
                req.user = user;
                user.save(function(err) {
                    callback(err, token, user);
                });
            });
        },
        function(token, user, callback) {
            var smtpTransport = nodemailer.createTransport(
                sendgridTransport({
                    auth: {
                        api_key: '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'
                    }
                })
            );
            var mailOptions = {
                to: req.body.email,
                from: 'passwordreset@demo.com',
                subject: 'Node.js Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://localhost:4200/reset-password/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                callback(err, 'done');
            });
        }
    ], function(err) {
        if (err) return next(err);
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


const addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        console.log("newUser.password", newUser.password);
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