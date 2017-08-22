var path = require('path');
// Require each controller you reference
var users = require('../controllers/users.js');
var pins = require('../controllers/pins.js');
var boards = require('../controllers/boards.js');


module.exports = function(app){
    // user routes
    app.post('/api/reg', function(req, res) {
        users.reg(req, res);
    })

    app.post('/api/login', function(req, res) {
        users.login(req, res);
    })

    // board routes
    app.post('/api/create_board', function(req, res){
        console.log("CREATE BOARD MADE IT TO ROUTES", req.body)
        boards.create(req, res)
    })

    // pin routes
    app.post('/api/create_pin', function(req, res){
        pins.create(req, res);
    });

    app.post('/api/getSourceData', function(req, res){
        pins.getSourceData(req, res);
    });

    // incorporate Angular for all other routes
    app.all('*', (req, res) => {
        res.sendFile(path.resolve('./public/dist/index.html'));
    });
};