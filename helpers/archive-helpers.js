var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
};

exports.isUrlInList = function(url, callback) {
  //this checks if url is in sites.txt
  //returns boolean 
  //var inlist = false;
  fs.readFile(exports.paths.list, 'utf8', function (err, data) {
    if (err) { throw err; } 
    if (data.indexOf(url) >= 0) {
      callback(true);
    } else {
      callback(false);
    }
  });
  ///return inlist;
};

exports.addUrlToList = function(url) {
  fs.appendFile(exports.paths.list, url + '\n', function (err) {
    if (err) { throw err; }
    console.log('Saved!');
  });
};

exports.isUrlArchived = function(url, callback) {
};

exports.downloadUrls = function(urls) {
};
