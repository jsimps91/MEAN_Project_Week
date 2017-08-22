var path = require('path');
// Require each controller you reference
var pins = require('../controllers/pins.js');

module.exports = function(app){

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