'use strict';

var clc = require('cli-color');
var Command = require('./command');
var codes = require('./codes');

var styles = {
  error: clc.red,
  success: clc.yellow.bold
};

function Deploy(token, repo, branch, skip) {
  this.token = token;
  this.repo = repo;
  this.branch = branch;
  this.skip = skip;
}

Deploy.prototype = Object.create(Command);
Deploy.prototype.constructor = Deploy;

Deploy.prototype.parseResponse = function(res) {
  var msg = [];
  switch(res.code) {
    case codes.SUCCESS:
      msg.push(styles.success('Stackahoy! Your deployment has been queued.'));
      break;
    case codes.TOKEN_ERROR:
      msg.push(
        styles.error(
          'The token provided is invalid. Please check to make sure the ' +
            'token matches the one on your dashboard.'
        )
      );
      break;
    case codes.BRANCH_DOES_NOT_EXIST:
      msg.push(
        styles.error(
          'Please make sure the branch name you provided is correct.\n\n' +
          'Tip: You can do `stackahoy list` to see what is available.'
        )
      );
      break;
    case codes.REPO_DOES_NOT_EXIST:
      msg.push(
        styles.error(
          'Please make sure the repository ID you provided is correct.'
        )
      );
      break;
    default:
      msg.push(styles.error('An unkown error occurred.'));
  }
  return msg.join('\n');
};

Deploy.prototype.format = function() {
  return [
    'cli',
    'deploy',
    this.token,
    this.repo,
    this.branch,
    this.skip ? '0' : '1'
  ].join('/');
};

module.exports = function(token, repo, branch, skip) {
  return new Deploy(token, repo, branch, skip).run();
};
