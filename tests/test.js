'use strict';
var https = require('https');
var api_key = 'qwerty';
function apiCall() {
  https.get('https://na.api.pvp.net/api/lol/na/v1.2/champion/1?api_key=' + api_key, function(res) {
    if (res.statusCode === 200) {
      console.log('Success: ' + res.statusCode);
    } else if (res.statusCode === 401) {
      console.log('Message: ' + res);
    }
  }).on('error', function(e) {
    console.error('Error: ' + e.message);
  });
}
apiCall();
