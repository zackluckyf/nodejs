(function() {

    'use strict';

    function doWork(shouldFail) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                if (typeof shouldFail === 'boolean' && shouldFail === true) {
                    reject('crashed!');
                } else {
                    resolve('worked!');
                }
            }, 1000);
        });
    }

    doWork().then(function() {
        return doWork(true);
    }).then(function(message) {
        console.log(`${message}`);
    }).catch(function(error) {
        console.log(`it failed with error: ${error}`);
    });

    // couple of practice promise functions

    function getLocation() {
        return new Promise(function(resolve, reject) {
            resolve('Philadelphia');
        });
    }

    function getWeather(location) {
        return new Promise(function(resolve, reject) {
            resolve(`It's 78 in ${location}`);
        });
    }

    getLocation().then(function(data) {
        return getWeather(data);
    }).then(function(data) {
        console.log(data);
    });


})();
