/**
 * Created by SHEKHAR on 22/10/2015.
 */
var express = require('express');
var router = express.Router();
var request = require('request');
var querystring = require('querystring');
var firebase = require('firebase');
var myFirebaseRef = new firebase('https://beerinessnode.firebaseio.com/');
var myFirebaseRefChild1 = myFirebaseRef.child("instadata");

myFirebaseRef.child("instadata").on("value", function(snapshot) {
    console.log("Value changed: " + JSON.stringify(snapshot.val()));
});

router.get('/test',function(req,res,next){
   res.end("Successfully tested");
});

router.get('/', function(req, res, next) {
    console.log("hub.challenge" + req.query['hub.challenge']);
    if (req.query['hub.challenge'])
        res.end(req.query['hub.challenge']);
    else {
        res.end("404");
    }
});


router.post("/",function(req,res,next){
    console.log("Receiving update for subscription");
    myFirebaseRefChild1.push(req.body);

    //res.end(JSON.stringify(req.body) + "\n");
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
                'callback_url':'https://beeriness-wssup.rhcloud.com/url/'
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

router.all('/subscribe-location/:object_id',function(req,res,next) {
    request.post({
            url:'https://api.instagram.com/v1/subscriptions/',
            form: {
                'client_id': '3727f2ed293d4edf9ef0e8e7cfefdf3c',
                'client_secret':'b6a3fc224bab4ea68c62e65876d0da00 ',
                'object':'location',
                'aspect':'media',
                'object_id':req.params.object_id,
                'verify_token':'myVerifyToken',
                'callback_url':'https://beeriness-wssup.rhcloud.com/url/'
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


router.all('/subscribe-geographies/:lat/:lng',function(req,res,next) {
    request.post({
            url:'https://api.instagram.com/v1/subscriptions/',
            form: {
                'client_id': '3727f2ed293d4edf9ef0e8e7cfefdf3c',
                'client_secret':'b6a3fc224bab4ea68c62e65876d0da00 ',
                'object':'geography',
                'aspect':'media',
                'lat':req.params.lat,
                'lng':req.params.lng,
                'radius':'1000',
                'verify_token':'myVerifyToken',
                'callback_url':'https://beeriness-wssup.rhcloud.com/url/'
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


router.all('/subscribe-tags/:tag',function(req,res,next) {
    request.post({
            url:'https://api.instagram.com/v1/subscriptions/',
            form: {
                'client_id': '3727f2ed293d4edf9ef0e8e7cfefdf3c',
                'client_secret':'b6a3fc224bab4ea68c62e65876d0da00 ',
                'object':'tag',
                'object_id':req.params.tag | 'nofilter',
                'aspect':'media',
                'verify_token':'myVerifyToken',
                'callback_url':'https://beeriness-wssup.rhcloud.com/url/'
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


module.exports = router;