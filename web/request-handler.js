var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

var serveFile = function(request, response, path = '/public/index.html') {
  var filePath = __dirname + path;
  fs.stat(filePath, function(err, stats) {
    console.log('error', err);
    if (stats.isFile()) {
      response.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Disposition': 'inline'});
      let readStream = fs.createReadStream(filePath);
      readStream.on('error', (err) => {
        response.end(err);
      });
      
      readStream.pipe(response);
      //response.end();
      
    } else {
      response.writeHead(400, {'Content-Type': 'text/plain'});
      response.end('ERROR File does NOT Exist');
    }
  });  
};

exports.handleRequest = function (request, response) {
  request.setEncoding('utf8');
  
  
  if (request.method === 'POST') {
    request.on('data', function(url) {
      url = url.slice(4);
      
      // if (isUrlArchived(data)) {
      //   serveFile(downloadUrls(data), request, response);
      // }
      
      archive.isUrlInList(url, (bool)=>{
        // if (!bool) {
        //   archive.addUrlToList(url);
        // } 
        serveFile(request, response, '/public/loading.html'); 
      });
      
      
      //  {
      //   serveFile('/public/loading.html', request, response);  
      // }
      
      //Assuming it doesn't exist, add the link to sites.txt
      
      
      
    });
  }
  serveFile(request, response);

};

