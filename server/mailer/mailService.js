/**
 * Express configuration
 */

'use strict';
// var config = require('../config');
// var Madmimi = require('madmimi-node');
// var mm = new Madmimi('info@locategroup.com', config.mm_key, true);
var request = require('request');
// console.log(mm);
module.exports = function (app) {
  console.log('running');
  app.post('/mail', function (req, res) {
    var mail = req.body.address;

    request.post({
      url: 'http://api.madmimi.com/audience_lists/test/add?email=' + mail,
      body: {
        username: 'info@locategroup.com',
        api_key: process.env.mm_key,
      },
      json: true
    }, function (err, httpResponse, body) {
        if(err) { console.log('err', err); }

        if (httpResponse.statusCode === 200) {
          console.log('success');
          console.log(body);
          res.sendStatus(200);
        }
    });
  });
  
};
