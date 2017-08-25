var mongoose = require('mongoose');
var Board = mongoose.model('Board');
var User = mongoose.model('User');
var Pin = mongoose.model('Pin');

module.exports = {

    create: function(req, res){
        console.log(req.session.currUser);
        console.log("BOARD MADE IT TO CONTROLLER", req.body);
        User.findOne({_id: req.session.currUser._id}, function(err, user){
            var board = new Board({title: req.body.title, description: req.body.description, category: req.body.category});
            board._user = user._id;
            board.pins = [];
            user.boards.push(board);
            user.save(function(err){
                if(err){
                    console.log("COULD NOT SAVE BOARD TO USER BOARD LIST", err);
                }
                else{
                    board.save(function(err, board){
                        if(err){
                            console.log("COULD NOT SAVE NEW BOARD", err);
                        }
                        else{
                            console.log("BOARD SAVED", board);
                            res.json(board);
                        }
                    });
                }
            });
        });
    },

    getCuBoards: function(req, res){
        Board.find({_user: req.session.currUser}, function(err, boards){
            if (err){
                res.json(err);
            } else {
                res.json(boards);
            }
        });
    },

    showBoard: function(req, res){
        console.log("SHOW BOARD MADE IT OT CONTROLLER")
        Board.findOne({_id: req.params.id})
        .populate('pins').populate('_user')
        .exec(function(err, board){
            if(err){
                console.log("ERROR IN BOARDS CONTROLLER:", err)
            }
            else{
                console.log("SUCCESS! BOARD:", board)
                res.json(board)
            }
        })
    },

    getCoverImage: function(req, res){
        console.log("GET COVER IMAGE MADE IT TO CONTROLLER")
        Pin.findOne({_id: req.params.id}, function(err, pin){
            if(err){
                console.log("COULD NOT FIND PIN")
            }
            else{
                console.log("SUCCESS! PIN:", pin)
                res.json(pin)
            }
        })
    },

    searchByTopic: function(req, res) {
        console.log('AT BACK END: ', req.body);
        Board.find({category: req.body.topic}).populate("pins").exec(function(err, boards) {
            if (err) {
                console.log(err);
            } else {
                var pinsArr = [];
                if (boards.length === 0) {
                    res.json({
                        'message': "There are no boards in that topic yet.  Feel free to make one!"
                    })
                } else {
                    for (var i = 0; i < boards.length; i++) {
                        for (var j = 0; j < boards[i].pins.length; j++) {
                            pinsArr.push(boards[i].pins[j]);
                        }
                    }
                    console.log('BACK END, PINS ARRAY: ', pinsArr);
                    res.json({
                        'message': 'Here are some pins!',
                        'pins': pinsArr,
                    })
                }
            }
        })
    },

};
