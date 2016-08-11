var express = require('express');
var app = express();
var path = require('path');
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
var serverStatic = require('serve-static');
var PORT = process.env.PORT || 3000;

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(serverStatic(path.join(__dirname, 'public')));
//router
app.get('/', function(req, res) {
    res.render('home');
})
app.get('/about', function(req, res) {
    res.render('about');
})

//404
app.use(function(req, res) {
    res.status(404);
    res.render('404');
});
//500
app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(PORT, function() {
    console.log('Listening on port %d', 3000);
})