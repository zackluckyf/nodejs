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
    }, {
        id: 3,
        description: 'Rep thetas',
        completed: true
    }];

    app.get('/', function(req, res) {
        res.send('Todo API Root');
    });

    app.get('/todos', function(req, res) {
        res.json(todos);
    });

    app.get('/todos/:id', function(req, res) {
        // req.params.id needs to be parsed because it comes in as a string
        var todoId = Number.parseInt(req.params.id);
        var task;
        for (let todo of todos) {
            if (todo.id === todoId) {
                task = todo;
            }
        }
        if (task) {
            res.json(task);
        } else {
            res.status(404).send();
        }
    });

    app.listen(PORT, function() {
        console.log(`express server started on port: ${PORT}`);
    });

})();
