(function() {

    'use strict';

    let express = require('express');
    let app = express();
    const PORT = process.env.PORT || 3000;
    let todos = [{
        id: 1,
        description: 'Meet mom for lunch',
        completed: false
    }, {
        id: 2,
        description: 'Go to marked',
        completed: false
    }];

    app.get('/', function(req, res) {
        res.send('Todo API Root');
    });

    app.get('/todos', function(req, res) {
        res.json(todos);
    });

    // app.get('/todos/:id', function(req, res) {
    //     res.json(todos.id);
    // });

    app.listen(PORT, function() {
        console.log(`express server started on port: ${PORT}`);
    });

})();
