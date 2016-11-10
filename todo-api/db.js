(function() {

    'use strict';

    let Sequelize = require('sequelize');
    let sequelize = new Sequelize(undefined, undefined, undefined, {
        'dialect': 'sqlite',
        'storage': __dirname + '/data/dev-todo-api.sqlite'
    });

    let db = {};

    db.todo = sequelize.import(__dirname + '/models/todo.js');

    db.sequelize = sequelize;

    db.Sequelize = Sequelize;

    module.exports = db;

})();
