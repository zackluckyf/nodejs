(function() {

    'use strict';

    var express = require('express');
    var app = express();

    const PORT = process.env.PORT || 3000;

    app.get('/', function(req, res) {
        res.send('Todo API Root');
    });

    app.listen(PORT, function() {
        console.log(`express server started on port: ${PORT}`);
    });

})();
