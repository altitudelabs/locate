/**
 * Express configuration
 */

'use strict';

var request = require('request');
module.exports = function (app) {
  var apiHost = 'http://api.madmimi.com/';
  var listName = process.env.NODE_ENV === 'production' ? 'production' : 'test';
  app.post('/mail', function (req, res) {
    var mail = req.body.address;
    request.put({
      url: apiHost + 'audience_members/' + mail,
      body: {
        username: 'info@locategroup.com',
        api_key: process.env.MM_KEY
      },
      json: true
    }, function (err, httpResponse, body) {
      if(err) { console.log('err', err); }

      if (body.success) {
        res.sendStatus(409);
      } else {
        request.post({
          url: apiHost + 'audience_lists/' + listName + '/add?email=' + mail,
          body: {
            username: 'info@locategroup.com',
            api_key: process.env.MM_KEY,
          },
          json: true
        }, function (err, httpResponse, body) {
            if(err) { console.log('err', err); }
            if (httpResponse.statusCode === 200) {
              res.sendStatus(200);
            }
        });
      }
    });

  });
  
};
