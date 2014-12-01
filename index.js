#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var moment = require('moment');

var Jekyll = function (options) {
    this.layout  = 'post',
    this.title   = '',
    this.folder  = '',
    this.path    = '',
    this.file    = '',
    this.content = '',
    this.extension = 'markdown',
    this.init(options)
}

Jekyll.prototype.genFilePath = function (isDraft) {
    this.folder = isDraft ? '_drafts' : '_posts';
    this.path = path.join(this.folder, this.file);
}

Jekyll.prototype.genFileName = function (file) {
    this.title = file;
    this.date = moment().format('YYYY-MM-DD');
    this.file = this.date + '-' + this.title + '.' + this.extension;
}

Jekyll.prototype.genFileContent = function () {
    this.content = [
        '---',
        'layout: ' + this.layout,
        'title: '  + this.title,
        this.date,
        '---'
    ].join('\n');    
}

Jekyll.prototype.init = function (options) {
    this.genFileName(options.title);
    this.genFilePath(options.isDraft);
    this.genFileContent();
}

module.exports.new = function (title, options, cb) {    
    var jkl = new Jekyll({ 
        title: title,
        isDraft: options.isDraft 
    });
 
    !fs.existsSync(jkl.folder) && fs.mkdirSync(jkl.folder);
    
    if (fs.existsSync(jkl.path)) {
        return cb('file exists');
    }
    
    fs.writeFile(jkl.path, jkl.content, 'utf8', function(err) {
        if (err) {
            cb(err);
        }
        cb(null, jkl.path);
    });
}

