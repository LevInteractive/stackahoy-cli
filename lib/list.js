'use strict';

var clc = require('cli-color');
var Command = require('./command');
var codes = require('./codes');

var styles = {
  repo: clc.yellow.bold,
  branch: clc.blue,
  error: clc.red
};

function List(token) {
  this.token = token;
}

List.prototype = Object.create(Command);
List.prototype.constructor = List;

List.prototype.parseResponse = function(res) {
  var msg = [];
  switch(res.code) {
    case codes.SUCCESS:
      res.list.forEach(function(repo, idx) {
        if (repo.active) {
          msg.push(
            styles.repo(
              (idx + 1) + '. ' + repo.name + ' (ID: ' + repo.id + ')'
            )
          );
          repo.branches.forEach(function(branch) {
            msg.push(
              styles.branch(
                '    - ' + branch.name + ' (Branch: ' + branch.branch + ')'
              )
            );
          });
        }
      });
      break;
    case codes.TOKEN_ERROR:
      msg.push(
        styles.error(
          'The token provided is invalid. Please check to make sure the ' +
            'token matches the one on your dashboard.'
        )
      );
      break;
    default:
      msg.push('An unkown error occurred.');
  }
  return msg.join('\n');
};

List.prototype.format = function() {
  return [
    'cli',
    'list',
    this.token
  ].join('/');
};

module.exports = function(token) {
  return new List(token).run();
};
