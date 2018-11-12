var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;

// var settings = require('./api/config/settings');
// app.use(settings.forceHttps);

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res, next) {

    // Prevents an HTML response for API calls
    if (req.path.indexOf('/api/') != -1) {
        return next();
    }

    fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text) {
        res.send(text);
    });
});

app.get('*.js', function(req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
});

var cors = require('cors');

var whitelist = [
    'http://localhost:8080',
    'http://localhost:3000'
];
var corsOptions = {
    origin: function(origin, callback) {
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true,
    methods: ['GET,PUT,POST,DELETE,OPTIONS'],
    allowedHeaders: ['Access-Control-Allow-Headers', 'Origin', 'Access-Control-Allow-Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Cache-Control']
};
app.use(cors(corsOptions));

// GraphiQL Docs
// TODO refactor to graphql playground
var graphqlHTTP = require('express-graphql');
var apiSchema = require('./api/schema');

app.use('/api/v/:vid/graph', graphqlHTTP(function(req, res) {
    return {
        schema: apiSchema,
        rootValue: {
            req: req,
            res: res
        },
        pretty: true,
        graphiql: true
    };
}));


app.listen(port, function() {
    console.log('SetLife-ReactWithApi: Server running on port ' + port);
});