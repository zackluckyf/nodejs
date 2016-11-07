(function() {

    'use strict';

    var express = require('express');
    var app = express();

    let middleware = {
        requireAuthentication: function(req, res, next) {
            console.log('private route hit!');
            next();
        },
        logger: function(req, res, next) {
            let date = new Date().toString();
            console.log(`Request: ${req.method} ${req.url} made on ${date}`);
            next();
        }
    };

    app.use(middleware.logger);

    app.get('/about', middleware.requireAuthentication, function(req, res) {
        res.send('About us');
    });

    app.use(express.static(__dirname + '/public'));

    const PORT = 3000;

    app.listen(PORT, function() {
        console.log(`express server started on port: ${PORT}`);
    });

})();
