/**
 * Express configuration
 */

'use strict';

var request = require('request');
module.exports = function (app) {
  app.post('/mail', function (req, res) {
    var mail = req.body.address;
    request.put({
      url: 'http://api.madmimi.com/audience_members/' + mail,
      body: {
        username: 'info@locategroup.com',
        api_key: process.env.MM_KEY
      },
      json: true
    }, function (CheckErr, CheckHttpResponse, CheckBody) {
      if(CheckErr) { console.log('Check Duplicate Error', CheckErr); }

      if (CheckBody.success) {
        // req.flash({'test': 'hello'});
        res.sendStatus(409);
      } else {
        request.post({
          url: 'http://api.madmimi.com/audience_lists/test/add?email=' + mail,
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
                  promotion_name: 'email template 1',
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
