(function() {
    'use strict';
    let request = require('request');

    module.exports = function(location) {
        return new Promise(function(resolve, reject) {
            let encodedLocation = encodeURIComponent(location);
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${encodedLocation}&APPID=6b766b599bfc44b9f27b4f348f6ce770`;

            if (!location) {
                return reject(`No location provided!`);
            }

            request({
                url: url,
                json: true
            }, function(error, response, body) {
                if (error) {
                    reject('Unable to fetch weather!');
                } else {
                    let temp = body.main.temp;
                    let city = body.name;
                    resolve(`Temperature is ${temp} in ${city}`);
                }
            });
        });
    };

})();
