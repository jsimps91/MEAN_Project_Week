var mongoose = require('mongoose');
var Pin = mongoose.model('Pin');

module.exports = {
    // Example of CRUD operations
    create: function (req, res){
        // ****** This code will need to be modified to address associations when boards and users are ready!
        var pin = new Pin({
            source_link: req.body.source_link, 
            title: req.body.title, 
            image: req.body.image, 
        });
        pin.save(function(err){
            if(err){
                res.json(err);
            } else {
                res.json(pin);
            }
        });
    }, 

    // read: function (req, res){
    //     Pin.find({}, function(err, pins){
    //         if (err){
    //             res.json(err);
    //         } else {
    //             res.json(pins);
    //         }
    //     });
    // },

    // update: function(req, res){
    //     Pin.findOne({_id: req.params.id}, function(err, pin){
    //         if(err) {
    //             res.json(err);
    //         } else {
    //             pin.variable =  req.body.variable;
    //             pin.save(function(err){
    //                 if(err){
    //                     res.json(err);
    //                 } else {
    //                     res.json(pin);
    //                 }
    //             });
    //         }
    //     });
    // },

    // destroy: function(req, res){
    //     Pin.findOne({_id: req.params.id}).remove(function(err, removed){
    //         if(err) {
    //             res.json(err);
    //         } else {
    //             res.json(removed);
    //         }
    //     });
    // }
};