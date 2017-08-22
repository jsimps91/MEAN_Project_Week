var path = require('path');
// Require each controller you reference
var users = require('../controllers/users.js');
var pins = require('../controllers/pins.js');
var boards = require('../controllers/boards.js');


module.exports = function(app){
    // user routes
    app.post('/api/reg', function(req, res) {
        users.reg(req, res);
    });

    app.post('/api/login', function(req, res) {
        users.login(req, res);
    });

    app.get('/api/logout', function(req, res) {
        users.logout(req, res);
    });

    app.get('/api/show_user', function(req, res){
        users.getCurrentUser(req, res)
    });

    // board routes
    app.post('/api/create_board', function(req, res){
        console.log("CREATE BOARD MADE IT TO ROUTES", req.body)
        boards.create(req, res)
    });

    app.get('/api/show_profile/:id', function(req, res){
        console.log("SHOW USER PROFILE GOING INTO CONTROLLER", req.body);
        users.showProfile(req, res);
    });

    app.get('/api/get_cu_boards', function(req, res){
        boards.getCuBoards(req, res);
    });

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