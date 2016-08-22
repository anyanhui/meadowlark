var express = require('express');
var app = express();
var path = require('path');
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
var serverStatic = require('serve-static');
var PORT = process.env.PORT || 3000;

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(serverStatic(path.join(__dirname, 'public')));
//测试
app.use(function(req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});
app.use(function(req, res, next) {
    if (!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weather = getWeatherData();
    next();
});
//router
app.get('/', function(req, res) {
    res.render('home', {
        currency: {
           name: 'United States dollars',
           abbrev: 'USD',
        }, tours: [
           { name: 'Hood River', price: '$99.95' },
           { name: 'Oregon Coast', price: '$159.95' },
       ],
       specialsUrl: '/january-specials',
       currencies: [ 'USD', 'GBP', 'BTC' ]
    });
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
function getWeatherData() {
    return {
        locations: [
            {
                name: 'Portland',
                forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                weather: 'Overcast',
                temp: '54.1 F (12.3 C)',
            },
            {
                name: 'Bend',
                forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
                weather: 'Partly Cloudy',
                temp: '54.1 F (12.3 C)',
            },
            {
                name: 'Manzanita',
                forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
                weather: 'Light Rain',
                temp: '55.1 F (12.8 C)',
            }
        ]
    };
}

app.listen(PORT, function() {
    console.log('Listening on port %d', 3000);
})