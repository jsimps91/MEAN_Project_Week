var mongoose = require('mongoose');
// require bcrypt if using it for passwords etc
var bcrypt = require('bcrypt');

var SampleSchema = new mongoose.Schema({
    // sample attribute with validations
    variable: {
        type: String, 
        required: true, 
        minlength: 3
    }, 
}, {timestamps: true});

mongoose.model('Sample', SampleSchema)


// Sample user validation if needed - includes unique qualifier AND password hashing:
UserSchema.pre('save', function(next){
    var self = this;
    mongoose.models["User"].findOne({email : self.email},function(err, results) {
        if(err) {
            next(err);
        } else if(results) { //there was a result found, so the email address exists
            self.invalidate("email","email must be unique");
            next(new Error("email must be unique"));
        } else {
            this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8)),
            next();
        }
    });
});