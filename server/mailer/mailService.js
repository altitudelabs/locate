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
    }, function (CheckErr, CheckHttpResponse, CheckBody) {
      if(CheckErr) { console.log('Check Duplicate Error', CheckErr); }

      if (CheckBody.success) {
        res.sendStatus(409);
      } else {
        request.post({
          url: apiHost + 'audience_lists/' + listName + '/add?email=' + mail,
          body: {
            username: 'info@locategroup.com',
            api_key: process.env.MM_KEY,
          },
          json: true
        }, function (AddErr, AddHttpResponse, AddBody) {
            if(AddErr) { console.log('Add to List Error', AddErr); }
            if (AddHttpResponse.statusCode === 200) {
              request.post({
                url: 'https://api.madmimi.com/mailer',
                form: {
                  username: 'info@locategroup.com',
                  api_key: process.env.MM_KEY,
                  promotion_name: 'mobile friendly',
                  recipient: mail,
                  subject: 'Welcome to Locate!',
                  from: 'Locate Group <no-reply@locategroup.com>'
                },
                json: true
              }, function (SendErr, SendHttpResponse, SendBody) {
                if(SendErr) { console.log('Send Error', SendErr); }
                if(SendHttpResponse.statusCode === 200) {
                  res.sendStatus(200);
                }
              });
            }
        });
      }
    });

  });
  
};
