var koa = require('koa');
var router = require('koa-router');
var request = require('koa-request');
var app = new koa();

var _ = router();

_.get('/hello', getMessage);

function *getMessage(){
    var ip = this.request.ip;
    // comment out the next line for actual environment
    ip = '24.212.140.58';
    // last line is only for testing in order to run in localhost environment

    var ipJSON = { url: 'http://ip-api.com/json/'+ ip};

    var requestJSON = yield request(ipJSON);
    var info = JSON.parse(requestJSON.body);

    this.body = 'my full name is ' + info.lat;


}




app.use(_.routes());



app.listen(3000);
