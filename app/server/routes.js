// expose the routes to our app with module.exports
module.exports = function(app) {
    var db = require('./routes/db');
    require('./routes/posts')(app, db);
    require('./routes/photos')(app, db);
    var t = require('./routes/torrent')(app, db);
    
    require('./routes/profiles')(app, db, t);
    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('../public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

    return {
        torrent: t
    }
};