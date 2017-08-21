var path = require('path');
// Require each controller you reference
var samples = require('../controllers/sample.js');

module.exports = function(app){
    // sample crud routes
    app.post('/api/create', function(req, res){
        samples.create(req, res);
    });

    app.get('/api/read', function(req, res){
        samples.read(req, res);
    });

    app.post('/api/update/:id', function(req, res){
        samples.update(req, res);
    });

    app.delete('/api/destroy/:id', function(req, res){
        samples.destroy(req, res);
    });
    
    // incorporate Angular for all other routes
    app.all('*', (req, res) => {
        res.sendFile(path.resolve('./public/dist/index.html'));
    });
};