var mongoose = require('mongoose');
// *****Uncomment below line when any of the associations are ready
// var Schema = mongoose.Schema;

var PinSchema = new mongoose.Schema({
    // sample attribute with validations
    source_link: {
        type: String, 
        required: true, 
        minlength: 5
    }, 
    title: {
        type: String
    },
    image: {
        type: String, 
        required: true,
        minlength: 5
    },
    // *****Uncomment this field WHEN users are ready
    // _user: {
    //  type: Schema.Types.ObjectId, ref: 'User'   
    // },
    // *****Uncomment this field WHEN boards are ready
    // _board: {
    //     type: Schema.Types.ObjectId, ref: 'Board'
    // },
    // *****Uncomment this field WHEN users are ready
    // repins: [{
    //     type: Schema.Types.ObjectId, ref: 'Repinners'
    // }],
    // *****Uncomment this field WHEN comments are ready
    // comments: [{
    //     type: Schema.Types.ObjectId, ref: 'Comment',
    // }]
}, {timestamps: true});

mongoose.model('Pin', PinSchema)


