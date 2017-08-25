var path = require('path');
// Require each controller you reference
var users = require('../controllers/users.js');
var pins = require('../controllers/pins.js');
var boards = require('../controllers/boards.js');
var comments = require('../controllers/comments.js');


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
        users.getCurrentUser(req, res);
    });

    app.post('/api/follow', function(req, res){
        users.follow(req, res);
    });

    app.post('/api/unfollow', function(req, res){
        users.unfollow(req, res);
    });

    app.post('/api/update_user/:id', function(req, res){
        users.update(req, res)
    })

    // board routes
    app.post('/api/create_board', function(req, res){
        console.log("CREATE BOARD MADE IT TO ROUTES", req.body)
        boards.create(req, res);
    });

    app.get('/api/show_profile/:id', function(req, res){
        console.log("SHOW USER PROFILE GOING INTO CONTROLLER", req.body);
        users.showProfile(req, res);
    });

    app.get('/api/show_board/:id', function(req, res){
        console.log("SHOW BOARD GOING INTO CONTROLLER", req.body);
        boards.showBoard(req, res);
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

    app.get('/api/getPin/:id', function (req, res){
        pins.readOne(req, res);
    });

    app.get('/api/show_cover_image/:id', function(req, res){
        boards.getCoverImage(req, res);
    });

    app.post('/api/addComment/:id', function (req, res){
        comments.create(req, res);
    });

    app.get('/api/getAllPins', function(req, res) {
        pins.getAllPins(req, res);
    });

    app.get('/api/getRelevantPins', function(req, res) {
        pins.getRelevantPins(req, res);
    });

    app.get('/api/updateRepins/:id', function(req, res) {
        pins.updateRepins(req, res);
    });

    app.post('/api/search_by_user', function(req, res) {
        users.searchByUser(req, res);
    });

    app.post('/api/searchByTopic', function(req, res) {
        console.log('MADE IT TO THE ROUTES');
        boards.searchByTopic(req, res);
    })

    app.post('/api/set_topics', function(req, res) {
        console.log('MADE IT TO THE ROUTES');
        users.setTopics(req, res);        
    })

    // incorporate Angular for all other routes
    app.all('*', (req, res) => {
        res.sendFile(path.resolve('./public/dist/index.html'));
    });
};