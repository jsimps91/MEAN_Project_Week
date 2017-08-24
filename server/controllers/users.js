var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');

module.exports = {

    reg: function(req, res) {
        User.find({email: req.body.email}, function(error, user) {
            if (user.length >= 1) {
                res.json(user);
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
                })
            }
        })
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
                    res.json({'error': 'That email is not in our database.  Please register to continue.'})
                }
                    
            }
        })
    },

    logout: function(req, res) {
        req.session.destroy(function(err) {
            if (err) {
                console.log(err);
            } else {
                res.json({});
            }
        })
    },

    getCurrentUser: function(req, res){
        console.log('AT BACK END GETTING CURRENT USER');
        if (req.session.currUser) {
            let user = req.session.currUser
            console.log("USER IN SESSION IS", req.session.currUser)
            res.json(user);        
        } else {
            res.json({});
        }
    },

    showProfile: function(req, res){
        console.log("SHOW PROFILE MADE IT TO CONTROLLER")
        User.findOne({_id: req.params.id})
        .populate('boards').populate('pins')
        .exec(function(err, user){
            if(err){
                console.log("ERROR:", err);
            }
            else{
                console.log("SUCCESS! USER:", user);
                res.json(user);
            }
        });
    }

};