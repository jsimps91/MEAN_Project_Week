var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var Pin = mongoose.model('Pin');

module.exports = {

    create: function(req, res){
        Pin.findOne({_id: req.params.id}, function(err, pin){
            var comment = new Comment({
                content: req.body.comment,
                commenter: req.session.currUser.fullName,
            });
            comment._user = req.session.currUser._id;
            comment._pin = pin._id;
            pin.comments.push(comment);
            pin.save(function(err){
                if(err){
                    console.log("COULD NOT SAVE COMMENT TO PIN", err);
                } 
                else {
                    comment.save(function(err, comment){
                        if(err){
                            console.log("COULD NOT SAVE NEW COMMENT", err);
                        }
                        else {
                            console.log("COMMENT SAVED");
                            res.json(comment);
                        }
                    });
                }
            });
        });
    },

};