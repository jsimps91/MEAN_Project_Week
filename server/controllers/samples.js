var mongoose = require('mongoose');
// create a variable for the model you are using 
var Sample = mongoose.model('Sample');

module.exports = {
    // Example of CRUD operations
    create: function (req, res){
        var sample = new Sample({
            variable: req.body.variable
        });
        sample.save(function(err){
            if(err){
                res.json(err);
            } else {
                res.json(sample);
            }
        });
    }, 

    read: function (req, res){
        Sample.find({}, function(err, samples){
            if (err){
                res.json(err);
            } else {
                res.json(samples);
            }
        });
    },

    update: function(req, res){
        Sample.findOne({_id: req.params.id}, function(err, sample){
            if(err) {
                res.json(err);
            } else {
                sample.variable =  req.body.variable;
                sample.save(function(err){
                    if(err){
                        res.json(err);
                    } else {
                        res.json(sample);
                    }
                });
            }
        });
    },

    destroy: function(req, res){
        Sample.findOne({_id: req.params.id}).remove(function(err, removed){
            if(err) {
                res.json(err);
            } else {
                res.json(removed);
            }
        });
    }
};