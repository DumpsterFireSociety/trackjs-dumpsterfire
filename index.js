var keys = require('./keys');
var luxon = require('luxon');
var https = require('https');

exports.handler = function (event, context, callback) {
  https.get('https://api.trackjs.com/' + keys.trackJS.customerID + '/v1/errors?application=' + keys.trackJS.application + '&size=100', 
    {
        headers: {
            'Authorization':  keys.trackJS.apiKey
        }
    }, function(response){
        var body = "";
        response.on('data', function(data) {
            body += data;
        });
        response.on('end', function() {
            //here we have the full response, html or json object
            var responseJson = JSON.parse(body);
            var startTime = luxon.DateTime.fromISO(responseJson.data[0].timestamp);
            var endTime = luxon.DateTime.fromISO(responseJson.data[responseJson.data.length-1].timestamp);
            var overThreshhold = "false";
            // if the number of minutes 100 errors occurred in is under the threshhold set in the keys file 
            var timeDifference = startTime.diff(endTime, ['minutes']).values.minutes;
            if (timeDifference < keys.trackJS.minuteThreshhold) {
                overThreshhold = "true";
            }
            var postData = "args="+ overThreshhold +"&access_token=" + keys.particle.accessToken;
            var postOptions = {
                host: "api.particle.io",
                path: "/v1/devices/" + keys.particle.deviceID + "/setFire",
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': postData.length
                }
            };
            var req = https.request(postOptions, function (res) {
                var result = '';
                res.on('data', function (chunk) {
                    result += chunk;
                });
                res.on('end', function () {
                    console.log(result);
                });
                res.on('error', function (err) {
                    console.log(err);
                })
            });
            req.write(postData);
            req.end();
        })
        response.on('error', function(e) {
            console.log("Got error: " + e.message);
        });
    });  
};