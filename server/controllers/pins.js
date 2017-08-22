var mongoose = require('mongoose');
var Pin = mongoose.model('Pin');
var request = require('request');
var cheerio = require('cheerio');

function collectImages($) {
    return $("img").map(function() {
         return $(this).prop("src");
      }).get();
 }
 
 function getTitle($) {
     return $("h1").map(function() {
         return $(this).text();
     });
 }

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

    getSourceData: function (req, res){
        var url = req.body.url;
        if (!url.startsWith('http')){
            url = 'http://' + url;
        }
        var images = [];
        var title;
        request(url, function(error, response, body){
            var $ = cheerio.load(body);
            images = collectImages($);
            title = getTitle($);
            if (title[1]){
                title = title[1];
            } else {
                title = title[0];
            }
            res.json({"images": images, "title": title});
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