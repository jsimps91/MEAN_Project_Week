var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {

    reg: function(req, res) {
        User.find({email: req.body.email}, function(error, user) {
            if (user.length >= 1) {
                console.log('USER ALREADY EXISTS');
                res.json(user);
            } else {
                var newUser = new User({
                    fullName: req.body.fullName,
                    email: req.body.email,
                    gender: req.body.gender,
                    password: req.body.password,
                    age: req.body.age
                });
                newUser.save(function(err) {
                    if (err) {
                        console.log('FAILURE');
                        res.json(err);
                    } else {
                        req.session.currUser = newUser;
                        console.log('THIS IS THE CURRENT USER registration: ', req.session.currUser)
                        res.json(newUser);
                    }
                })
            }
        })
    },


    login: function(req, res) {
        User.find({email: req.body.email}, function(error, user) {
            if (error) {
                console.log('ERROR');
            } else {
                if (user.length > 0) {
                    req.session.currUser = user[0];
                    console.log('SUCCESSFULLY LOGGEDIN USER: ', user);
                }
                res.json(user);
            }
        })
    },

    getCurrentUser: function(req, res){
        console.log("USER IN SESSION IS", req.session.currUser)
        res.json(req.session.currUser)
    },

    showProfile: function(req, res){
        console.log("SHOW PROFILE MADE IT TO CONTROLLER")
        User.findOne({_id: req.params.id})
        .populate('boards')
        .exec(function(err, user){
            if(err){
                console.log("ERROR:", err)
            }
            else{
                console.log("SUCCESS! USER:", user)
                res.json(user)
            }
        })
    }

};