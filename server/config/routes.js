var path = require('path');
// Require each controller you reference
var users = require('../controllers/users.js');
var pins = require('../controllers/pins.js');


module.exports = function(app){

    app.post('/api/reg', function(req, res) {
        users.reg(req, res);
    })

    app.post('/api/login', function(req, res) {
        users.login(req, res);
    })

    app.post('api/create_pin', function(req, res){
        pins.create(req, res);
    });

    // incorporate Angular for all other routes
    app.all('*', (req, res) => {
        res.sendFile(path.resolve('./public/dist/index.html'));
    });
};