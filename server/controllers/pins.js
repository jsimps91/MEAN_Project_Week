var mongoose = require('mongoose');
var Pin = mongoose.model('Pin');
var User = mongoose.model('User');
var Board = mongoose.model('Board');
var request = require('request');
var cheerio = require('cheerio');

function collectImages($) {
    return $("img").map(function () {
        return $(this).prop("src");
    }).get();
}

function getTitle($) {
    return $("h1").map(function () {
        return $(this).text();
    });
}

module.exports = {
    // Example of CRUD operations
    create: function (req, res){
        Board.findOne({_id: req.body.board}, function(err, board){
            var pin = new Pin({
                source_link: req.body.source_link,
                title: req.body.title,
                image: req.body.image,
                repinned: req.body.repinned,
            });
            User.findOne({ _id: req.session.currUser._id }, function (err, user) {
                user.pins.push(pin);
                user.save(function (err) {
                    if (err) {
                        console.log("couldn't save pin to user")
                    }
                    else {
                        pin._board = board._id;
                        pin._user = req.session.currUser._id;
                        pin.repins = 0;
                        board.pins.push(pin);
                        board.save(function (err) {
                            if (err) {
                                console.log("COULD NOT SAVE PIN TO BOARD", err);
                            }
                            else {
                                pin.save(function (err, pin) {
                                    if (err) {
                                        console.log("COULD NOT SAVE NEW PIN", err);
                                    }
                                    else {
                                        console.log("PIN SAVED", pin);
                                        res.json(pin);
                                    }
                                });
                            }
                        })
                    }
                })
            });
        });
    },

    getSourceData: function (req, res) {
        var url = req.body.url;
        if (!url.startsWith('http')) {
            url = 'http://' + url;
        }
        var sub_urls = url.split('/')
        var images = [];
        var title;
        request(url, function (error, response, body) {
            var $ = cheerio.load(body);
            images = collectImages($);
            for (var i = 0; i < images.length; i++) {
                if (images[i].startsWith('/')) {
                    images[i] = sub_urls[0] + '//' + sub_urls[2] + images[i];
                }
            }
            title = getTitle($);
            if (title[1]) {
                title = title[1];
            } else {
                title = title[0];
            }
            res.json({ "images": images, "title": title });
        });
    },


    readOne: function (req, res) {
        Pin.findOne({ _id: req.params.id }).populate('_user').populate('_board').populate('comments').exec(function (err, pin) {
            if (err) {
                res.json(err);
            } else {
                res.json(pin);
            }
        });
    },

    getAllPins: function(req, res) {
        // if(req.session.currUser) {
        //     var topics = req.session.currUser.topics; 
        //     var randTopic = topics[Math.floor(Math.random * topics.length)];           
        // }
        // var resArr = [];

        // Board.find({category: randTopic}).populate('pins').exec((err, boards) => {
        //     var resArr = [];
        //     for(var j = 0; j < boards.length; j++) {
        //         for(var k = 0; k < boards[j].pins.length; k++) {
        //             resArr.push(boards[j].pins[k]);
        //         }
        //     }
        //     console.log('THE OFFICIAL RES ARR: ', resArr);            
        // });

        // //console.log('THE OFFICIAL RES ARR: ', resArr);
        // res.json(resArr);
        Pin.find({}, function(err, pins) {
            if (err) {
                res.json(err);
            } else {
                res.json(pins);
            }
        })
    },

    updateRepins: function(req, res){
        Pin.findOne({_id: req.params.id}, function(err, pin){
            if(err) {
                res.json(err);
            } else {
                pin.repins += 1;
                pin.save(function(err){
                    if(err){
                        res.json(err);
                    } else {
                        res.json(pin);
                    }
                });
            }
        });
    },


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