(function() {

    'use strict';

    let express = require('express');
    let bodyParser = require('body-parser');
    let _ = require('underscore');
    let app = express();
    const PORT = process.env.PORT || 3000;
    let todos = [];
    let todoNextId = 1;

    app.use(bodyParser.json());

    app.get('/', function(req, res) {
        res.send('Todo API Root');
    });

    // GET /todos
    app.get('/todos', function(req, res) {
        res.json(todos);
    });

    // GET /todos/:id
    app.get('/todos/:id', function(req, res) {
        var todoId = Number.parseInt(req.params.id);
        var matchedTodo = _.findWhere(todos, {
            id: todoId
        });
        if (matchedTodo) {
            res.json(matchedTodo);
        } else {
            res.status(404).send();
        }
    });

    // POST /todos
    app.post('/todos', function(req, res) {
        var body = _.pick(req.body, 'description', 'completed'); // Use _.pick to only pick description and completed

        if (_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
            return res.status(400).send();
        }

        body.description = body.description.trim();
        body.id = todoNextId++;

        todos.push(body);

        res.json(todos);
    });

    // DELETE /todos/:id
    app.delete('/todos/:id', function(req, res) {
        var todoId = parseInt(req.params.id, 10);
        var matchedTodo = _.findWhere(todos, {
            id: todoId
        });

        if (!matchedTodo) {
            res.status(404).json({
                "error": "no todo found with that id"
            });
        } else {
            todos = _.without(todos, matchedTodo);
            res.json(matchedTodo);
        }
    });

    // PUT /todos/:id
    app.put('/todos/:id', function(req, res) {
        var todoId = parseInt(req.params.id, 10);
        var matchedTodo = _.findWhere(todos, {
            id: todoId
        });
        var body = _.pick(req.body, 'description', 'completed');
        var validAttributes = {};

        if (!matchedTodo) {
            res.status(404).json({
                "error": "no todo found with that id"
            });
        }

        if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
            validAttributes.completed = body.completed;
        } else if (body.hasOwnProperty('completed')) {
            return res.status(400).send();
        }

        if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
            validAttributes.description = body.description;
        } else if (body.hasOwnProperty('description')) {
            return res.status(400).send();
        }

        _.extend(matchedTodo, validAttributes);
        res.json(matchedTodo);
    });

    app.listen(PORT, function() {
        console.log(`express server started on port: ${PORT}`);
    });

})();
