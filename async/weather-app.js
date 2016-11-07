(function() {
    'use strict';

    let weather = require('./services/weather.js');
    let location = require('./services/location.js');

    let argv = require('yargs')
        .option('location', {
            demand: false,
            alias: 'l',
            description: 'City to search weather for',
            type: 'string'
        }).help('help')
        .argv;

    if (typeof argv.l === 'string' && argv.l.length > 0) {
        try {
            console.log('location was provided!');
            weather(argv.location).then(function(data) {
                console.log(data);
            });
        } catch (e) {
            console.log(`Error: ${e.message}`);
        }
    } else {
        try {
            location().then(function(data) {
                return weather(data);
            }).then(function(data) {
                console.log(data);
            });
        } catch (e) {
            console.log(`Error: ${e.message}`);
        }
    }
})();

// node weather-app.js
// node weather-app.js -l City name
