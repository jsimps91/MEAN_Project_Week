var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;


var UserSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    age: String,
    gender: String,
    password: String,
    boards: [{type: Schema.Types.ObjectId, ref: 'Board'}]
});

mongoose.model('User', UserSchema);


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
