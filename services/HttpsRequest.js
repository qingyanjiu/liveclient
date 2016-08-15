const https = require('https');

module.exports = {
  httpsRequest:function (options,callback){
    var req = https.request(options, (res) => {
      console.log('statusCode: ', res.statusCode);
      console.log('headers: ', res.headers);
    
      res.on('data', (d) => {
        callback(d);
      });
    });
    
    req.end();
    
    req.on('error', (e) => {
      console.error(e);
    });
  }
}