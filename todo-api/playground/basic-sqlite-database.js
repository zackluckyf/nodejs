(function() {
    'use strict';

    let Sequelize = require('sequelize');
    let sequelize = new Sequelize(undefined, undefined, undefined, {
        'dialect': 'sqlite',
        'storage': __dirname + '/basic-sqlite-database.sqlite'
    });

    var Todo = sequelize.define('todo', {
        description: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [1, 250]
            }
        },
        completed: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    sequelize.sync({
        // force: true
    }).then(() => {
        console.log('Everything is synced');

        Todo.findById(3).then(todo => {
            if (todo) {
                console.log(todo.toJSON());
            } else {
                console.log('Todo not found');
            }
        });

        // Todo.create({
        //     description: 'Take out trash'
        // }).then(todo => {
        //     return Todo.create({
        //         description: 'Clean office'
        //     });
        //
        // }).then(() => {
        //     // return Todo.findById(1);
        //     return Todo.findAll({
        //         where: {
        //             description: {
        //                 $like: '%trash%'
        //             }
        //         }
        //     });
        // }).then(todos => {
        //     if (todos) {
        //         todos.forEach(function(data) {
        //             console.log(data.toJSON());
        //         });
        //     } else {
        //         console.log('no todos found!');
        //     }
        // }).catch(err => {
        //     console.log(err.message);
        // });
    });

})();
