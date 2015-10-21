/**
 * Created by SHEKHAR on 22/10/2015.
 */
var express = require('express');
var router = express.Router();
var request = require('request');
var querystring = require('querystring');
var firebase = require('firebase');
var myFirebaseRef = new firebase('https://beeriness01.firebaseio.com/');

myFirebaseRef.child("location/city").on("value", function(snapshot) {
    console.log("Value changed: " + snapshot.val());  // Alerts "San Francisco"
});

/* GET home page. */
/*
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Instagram' });
});
*/

router.get('/', function(req, res, next) {
    console.log("hub.challenge" + req.query['hub.challenge']);
    if (req.query['hub.challenge'])
        res.end(req.query['hub.challenge']);
});


router.all('/subscribe-user/*',function(req,res,next) {
    request.post({
            url:'https://api.instagram.com/v1/subscriptions/',
            form: {
                'client_id': '3727f2ed293d4edf9ef0e8e7cfefdf3c',
                'client_secret':'b6a3fc224bab4ea68c62e65876d0da00 ',
                'object':'user',
                'aspect':'media',
                'verify_token':'myVerifyToken',
                'callback_url':'https://beeriness01.firebaseio.com/URL'
            },
            headers: {'accept': "application/json"}
        },
        function(err,httpResponse,body){
            if (err) {
                console.log("Error reaching instagram service" + err);
            }
            res.end("BODY : " + "\n" + JSON.stringify(body) + "\n" + "HTTP : "
                + "\n" + JSON.stringify(httpResponse));
        });
});

router.all('/subscribe-location/*',function(req,res,next) {
    request.post({
            url:'https://api.instagram.com/v1/subscriptions/',
            form: {
                'client_id': '3727f2ed293d4edf9ef0e8e7cfefdf3c',
                'client_secret':'b6a3fc224bab4ea68c62e65876d0da00 ',
                'object':'location',
                'aspect':'media',
                'verify_token':'myVerifyToken',
                'callback_url':'https://beeriness01.firebaseio.com/URL'
            },
            headers: {'accept': "application/json"}
        },
        function(err,httpResponse,body){
            if (err) {
                console.log("Error reaching instagram service" + err);
            }
            res.end("BODY : " + "\n" + JSON.stringify(body) + "\n" + "HTTP : "
                + "\n" + JSON.stringify(httpResponse));
        });
});


router.all('/write/:data',function(req,res,next) {
    myFirebaseRef.set({
        title: req.params.data,
        author: "Firebase",
        location: {
            city: "San Francisco",
            state: "California",
            zip: 94103
        }
    });
    res.writeHead(200, {"Content-Type": "application/json"});
    var output = { error: null, data: "Data updated at https://beeriness01.firebaseio.com/" };
    res.end(JSON.stringify(output) + "\n");
});
module.exports = router;