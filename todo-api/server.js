(function() {

    'use strict';

    let express = require('express');
    let bodyParser = require('body-parser');
    let _ = require('underscore');
    let db = require('./db.js');

    let app = express();
    const PORT = process.env.PORT || 3000;
    let todos = [];
    let todoNextId = 1;

    app.use(bodyParser.json());

    app.get('/', function(req, res) {
        res.send('Todo API Root');
    });

    // GET /todos?completed=true&q=work
    app.get('/todos', function(req, res) {
        let query = req.query;
        var where = {};

        if (query.hasOwnProperty('completed') && query.completed === 'true') {
            where.completed = true;
        } else if (query.hasOwnProperty('completed') && query.completed === 'false') {
            where.completed = false;
        }

        if (query.hasOwnProperty('q') && query.q.length > 0) {
            where.description = {
                $like: '%' + query.q + '%'
            };
        }

        db.todo.findAll({
            where: where
        }).then(todos => {
            res.json(todos);
        }, function(e) {
            res.status(500).send();
        });

        // if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
        //     filteredTodos = _.where(filteredTodos, {
        //         completed: 'true'
        //     });
        // } else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
        //     filteredTodos = _.where(filteredTodos, {
        //         completed: 'false'
        //     });
        // }
        //
        // if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
        //     filteredTodos = _.filter(filteredTodos, function(todo) {
        //         return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;
        //     });
        // }
        //
        // res.json(filteredTodos);
    });

    // GET /todos/:id
    app.get('/todos/:id', function(req, res) {
        var todoId = Number.parseInt(req.params.id);
        db.todo.findById(todoId).then(todo => {
            if (!!todo) {
                res.json(todo.toJSON());
            } else {
                res.status(404).send();
            }
        }, function(e) {
            res.status(500).send();
        });
    });

    // POST /todos
    app.post('/todos', function(req, res) {
        var body = _.pick(req.body, 'description', 'completed'); // Use _.pick to only pick description and completed
        db.todo.create(body).then(todo => {
            res.json(todo.toJSON());
        }, function(e) {
            res.status(400).json(e);
        });
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

    db.sequelize.sync().then(() => {
        app.listen(PORT, function() {
            console.log(`express server started on port: ${PORT}`);
        });
    });



})();
