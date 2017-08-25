var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');
var Pin = mongoose.model('Pin');

module.exports = {

    reg: function(req, res) {
        User.find({email: req.body.email}, function(error, user) {
            if (user.length >= 1) {
                res.json({
                    'emailError': 'An account with that email already exists.  Please use a different email.'
                });
            } else {
                var newUser = new User({
                    fullName: req.body.fullName,
                    email: req.body.email,
                    gender: req.body.gender,
                    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8)),
                    age: req.body.age
                });
                newUser.boards = [];
                newUser.pins = [];
                newUser.save(function(err) {
                    if (err) {
                        res.json(err);
                    } else {
                        req.session.currUser = newUser;
                        res.json(newUser);
                    }
                });
            }
        });
    },


    login: function(req, res) {
        User.find({email: req.body.email}, function(error, user) {
            if (error) {
                res.json(error);
            } else {
                if (user.length > 0) {
                    if (bcrypt.compareSync(req.body.password, user[0].password)) {
                        req.session.currUser = user[0]; 
                        res.json(user[0]);                       
                    } else {
                        res.json({'error': 'Password is incorrect'});
                    }
                } else {
                    res.json({'error': 'That email is not in our database.  Please register to continue.'});
                }
                    
            }
        });
    },

    logout: function(req, res) {
        req.session.destroy(function(err) {
            if (err) {
                console.log(err);
            } else {
                res.json({});
            }
        });
    },

    getCurrentUser: function(req, res){
        if (req.session.currUser) {
            let user = req.session.currUser;
            res.json(user);        
        } else {
            res.json({});
        }
    },

    showProfile: function(req, res){
        User.findOne({_id: req.params.id})
        .populate('boards').populate('pins').populate('followers').populate('following')
        .exec(function(err, user){
            if(err){
                console.log(err);
            }
            else{
                res.json(user);
            }
        });
    },

    update: function(req, res){
        User.findById(req.params.id, function(err ,user){
            if(err){
                console.log("COULD NOT FIND USER")
            }
            else{
                user.fullName= req.body.fullName;
                user.email= req.body.email;
                user.age = req.body.age;
                user.gender = req.body.gender;
                user.save(function(err, user){
                    if(err){
                        console.log("Couldn't update user")
                        res.json({message: "There was a problem updating your info!"})
                    }
                    else{
                        console.log("User updated!")
                        res.json({message: "Profile successfully updated", user: user})
                    }
                })
            }
        })
    },

    searchByUser: function(req, res) {
        User.find({fullName: req.body.name}, function(err, users) {
            if (err) {
                console.log(err);
            } else if (users.length === 0) {
                res.json({
                    message: 'I\'m sorry, there are no users matching your search query.'
                });
            } else {
                Pin.find({_user: users[0]}, function(err, pins) {
                    if (err) {
                        console.log(err);
                    } else if (pins.length === 0) {
                        res.json({
                            'users': users,
                            'message': 'We found a user matching your search:'
                        });                          
                    } else {
                        let resObj = {
                            'users': users,
                            'pins': pins,
                            'message': 'We found a user matching your search:'                            
                        };
                        res.json(resObj);                            
                    }
                });
            }
        })
    },

    setTopics: function(req, res) {
        var currUser = req.session.currUser;
        User.findOne({email: currUser.email}, function(err, user) {
            user.topics = req.body;
            user.save(function(err) {
                if(err) {
                    console.log(err);
                } else {
                    res.json(user);
                }
            })
        });
    },


    follow: function (req, res){
        User.findOne({_id: req.body.id}, function(err, user){
            user.followers.push(req.session.currUser);
            user.save(function (err){
                if (err){
                    console.log('Could not add follower');
                } 
                else {
                    User.findOne({_id: req.session.currUser._id}, function(err, cuser){
                        cuser.following.push(user);
                        cuser.save(function(err){
                            if (err){
                                console.log('Could not add following');
                            }
                            else {
                                res.json(cuser);
                            }
                        });
                    });
                }
            });
        });
    },

    unfollow: function (req, res){
        User.findOne({_id: req.body.id}, function(err, user){
            let removeFollower = user.followers.indexOf(req.session.currUser._id);
            user.followers.splice(removeFollower, 1);
            user.save(function (err){
                if (err){
                    console.log('Could not remove follower');
                } 
                else {
                    User.findOne({_id: req.session.currUser._id}, function(err, cuser){
                        let removeFollowing = cuser.following.indexOf(user._id);
                        cuser.following.splice(removeFollowing, 1);
                        cuser.save(function(err){
                            if (err){
                                console.log('Could not remove following');
                            }
                            else {
                                res.json(cuser);
                            }
                        });
                    });
                }
            });
        });
    }
};