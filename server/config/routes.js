var path = require('path');
// Require each controller you reference
var users = require('../controllers/users.js');

module.exports = function(app){

    app.post('/api/reg', function(req, res) {
        users.reg(req, res);
    })

    app.post('/api/login', function(req, res) {
        users.login(req, res);
    })


};