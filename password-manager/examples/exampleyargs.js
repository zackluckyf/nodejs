(function() {

    'use strict';

    let argv = require('yargs')
        .command('hello', 'Greets the user', function(yargs) {
            yargs.options({
                firstName: {
                    demand: true,
                    alias: 'fn',
                    description: 'Your first name goes here',
                    type: 'string'
                },
                lastName: {
                    demand: true,
                    alias: 'ln',
                    description: 'Your last name goes here',
                    type: 'string'
                }
            }).help('help');
        })
        .command('get', 'some description', function(yargs) {

        })
        .help('help')
        .argv;
    let command = argv._[0];
    console.log(argv);
})();

// run node exampleyargs.js hello --help
