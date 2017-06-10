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
  request.setEncoding('utf8');

  if (request.method === 'POST') {
    request.on('data', function (url) {
      console.log('we are in data');
      url = url.slice(4);

      archive.isUrlArchived(url, bool => {
        if (bool) {
          serveFile(request, response, archive.paths.archivedSites + url);
        } else {
          archive.isUrlInList(url, bool => {
            if (bool) { // it's already being added
              serveFile(request, response, '/public/loading.html');
            } else {
              archive.addUrlToList(url, bool => {
                serveFile(request, response, '/public/loading.html');
              });
            }
          });
        }
      });
    });
  } else {
    serveFile(request, response);
  }
};

