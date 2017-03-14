//Shala Chen
//Shalachen1.0@gmail.com
var koa = require('koa');
var router = require('koa-router');
var request = require('koa-request');
var app = new koa();
var _ = router();

app.use(_.routes());

_.get('/weather', getWeather);

function *getWeather(next){
    var ip = this.request.ip;
    // comment out the next line for actual environment
    ip = '24.212.140.00';
    // last line is only for testing in order to run in localhost environment
    var request_location = { url: 'http://ip-api.com/json/'+ ip};
    var ipJSON = yield request(request_location);
    var ip_info = JSON.parse(ipJSON.body);
    this.lat = ip_info.lat;
    this.lon = ip_info.lon;

    var request_weather = { url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + this.lat + '&lon=' + this.lon + '&appid=300102536682e74c647f9a6855051274'};
    var weatherJSON = yield request(request_weather);
    var weather_info = JSON.parse(weatherJSON.body);
    this.temp = weather_info.main.temp;
    this.weatherCode = weather_info.weather[0].main;
    console.log(this.lat,this.lon,this.temp,this.weatherCode);
    this.body = 'Nice to meet you :)';
    yield next;
}

app.listen(3000);
