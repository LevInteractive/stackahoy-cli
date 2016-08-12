'use strict';

var request = require('request');
var baseUrl = process.env.BASE_URL || 'https://stackahoy.io';

var errorCodes = {
  SUCCESS: 1000,
  TOKEN_ERROR: 6001,
  BRANCH_DOES_NOT_EXIST: 6002,
  REPO_DOES_NOT_EXIST: 6003
};

var Command = {
  format: function() {
    throw new Error('Method must be extended.');
  },
  parseResponse: function(res) {
    throw new Error('Method must be extended.');
  },
  run: function() {
    var url = baseUrl + '/' + this.format();
    var complete = this.complete;
    var parseResponse = this.parseResponse;

    request(url, function(err, res, body) {
      if (err) {
        console.error('An error occurred: ', err.message);
        complete(1);
      } else {
        try {
          var json = JSON.parse(body);
          console.log('\n\n' + parseResponse(json) + '\n\n');
          complete(0);
        } catch (e) {
          console.error('Bad response: ', e.message);
          complete(1);
        }
      }
    });
  },
  complete: function(exitCode) {
    process.exit(exitCode || 0);
  }
};

module.exports = Command;
