var mongoose = require('mongoose');
var Board = mongoose.model('Board');
var User = mongoose.model('User');

module.exports = {

    create: function(req, res){
        console.log(req.session.currUser)
        console.log("BOARD MADE IT TO CONTROLLER", req.body)
        User.findOne({_id: req.session.currUser._id}, function(err, user){
            var board = new Board({title: req.body.title, description: req.body.description, category: req.body.category})
            board._user = user._id
            board.pins = []
            user.boards.push(board)
            user.save(function(err){
                if(err){
                    console.log("COULD NOT SAVE BOARD TO USER BOARD LIST", err)
                }
                else{
                    board.save(function(err, board){
                        if(err){
                            console.log("COULD NOT SAVE NEW BOARD", err)
                        }
                        else{
                            console.log("BOARD SAVED", board)
                            res.json(board)
                        }
                    })
                }
            })
        })
    }
}
