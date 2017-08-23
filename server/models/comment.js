var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new mongoose.Schema({
    content: {
        type: String, 
        required: true,
    },
    commenter: {
        type: String, 
        required: true,
    },
    _user: {
        type: Schema.Types.ObjectId, ref: 'User'   
    },
    _pin: {
        type: Schema.Types.ObjectId, ref: 'Pin'
    }
}, {timestamps: true});

mongoose.model('Comment', CommentSchema)
