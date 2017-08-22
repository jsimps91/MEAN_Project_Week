var mongoose = require('mongoose');
// require bcrypt if using it for passwords etc


var BoardSchema = new mongoose.Schema({
    // sample attribute with validations
    title: {
        type: String, 
        required: true, 
    }, 
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true
    },
    //_user: {type: Schema.Types.ObjectId, ref: 'User'},
    //pins: [{type: Schema.Types.ObjectId, ref: 'Pin'}]
},  
 {timestamps: true});

mongoose.model('Board', BoardSchema)


