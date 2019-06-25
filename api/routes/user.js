const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../model/User');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
router.post("/signup", function (req, res, next) {
    console.log("hitt", req.body);
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                res.status(409).json({
                    message: 'Email already exits'
                });
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(200).json({
                            error: err

                        });
                    }
                    else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            firsName: req.body.firsName,
                            lastName: req.body.lastName,
                            mobile: req.body.mobile,

                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User Created'
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(200).json({
                                    error: err
                                });
                            })
                    }
                })


            }
        })
});

router.delete("/:userId", (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User Deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


router.post("/login", (req, res, next) => {
    console.log(req.body);
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    message: "Auth failed"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth Failed"
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: "Auth Successful",
                        token: token
                    })
                }
                return res.status(401).json({
                    message: "Auth Failed"
                });
            })

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})



router.post("/reset", (req, res, next) => {
    console.log("CALL IN SERVICE API", req.body.email);
    var email1 = req.body.email;

    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            id1 = user[0]._id;
            console.log(id1);
            if (user.length < 1) {
                return res.status(404).json({
                    message: "Auth failed"
                });
            }
            else {

                console.log(email1);
                var path = "http://localhost:4200/confirm/" + id1
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'ankitbhosale15@gmail.com',
                        pass: 'mnyyaulrvqavtsra'
                    }
                });

                var mailOptions = {
                    from: 'ankitbhosale15@gmail.com',
                    to: email1,
                    subject: 'Sending Email using Node.js',
                    text: 'Click Here--->' + path
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        res.status(200).json({
                            message: "email send"
                        })
                        console.log('Email sent: ' + info.response);
                    }
                });

            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

})

router.put('/:userId', function (req, res, next) {
    console.log(req.body.password);
    const id = req.params.userId;
    User.findOne({ _id: id }).then(function (user) {
        console.log(user.password);
        user.password = req.body.password
        console.log(user.password);
        bcrypt.hash(user.password, 10, (err, hash) => {
            if (err) {
                return res.status(200).json({
                    error: err

                });
            } else {
                user.password = hash
                User.findByIdAndUpdate({ _id: id }, user)
                    .then(function () {
                        console.log(user.password);
                        res.send(user);
                    })


            }
        })
    })

});


module.exports = router;