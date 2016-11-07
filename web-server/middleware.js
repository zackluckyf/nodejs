(function() {

    'use strict';

    let middleware = {
        requireAuthentication: function(req, res, next) {
            console.log('private route hit!');
            next();
        },
        logger: function(req, res, next) {
            let date = new Date().toString();
            console.log(`Request: ${req.method} ${req.url} made on ${date}`);
            next();
        }
    };

    module.exports = middleware;

})();
