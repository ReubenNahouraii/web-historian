var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

var serveFile = function(request, response, path = '/public/index.html') {
  var filePath = __dirname + path;
  fs.stat(filePath, function(err, stats) {
    if (stats.isFile()) {
      response.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Disposition': 'inline; filename=' + 'loading.html'});
      fs.createReadStream(filePath).pipe(response);
    } else {
      response.writeHead(400, {'Content-Type': 'text/plain'});
      response.end('ERROR File does NOT Exists');
    }
  });  
};

exports.handleRequest = function (request, response) {
  console.log('we are in handlerequest')
  request.setEncoding('utf8');
  
  
  if (request.method === 'POST') {
    request.on('data', function(url) {
      console.log('we are in data')
      url = url.slice(4);
      
      // if (isUrlArchived(data)) {
      //   serveFile(downloadUrls(data), request, response);
      // }
      
      if (archive.isUrlInList(url)) {
        serveFile('/public/loading.html', request, response);  
      }
      
      //Assuming it doesn't exist, add the link to sites.txt
      archive.addUrlToList(url);
      serveFile(request, response, '/public/loading.html'); 
      
    });
  }
  serveFile(request, response);

};

