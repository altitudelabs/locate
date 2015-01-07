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
        api_key: 'a6b901c7f4d1f0a8dee2d7cad5a539c9'
      },
      json: true
    }, function (err, httpResponse, body) {
      if(err) { console.log('err', err); }

      if (body.success) {
        // req.flash({'test': 'hello'});
        res.sendStatus(409);
      } else {
        request.post({
          url: 'http://api.madmimi.com/audience_lists/test/add?email=' + mail,
          body: {
            username: 'info@locategroup.com',
            api_key: 'a6b901c7f4d1f0a8dee2d7cad5a539c9',
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
