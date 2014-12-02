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

Jekyll.prototype.genFilePath = function (draft) {
    this.folder = draft ? '_drafts' : '_posts';
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
    this.genFilePath(options.draft);
    options.create && this.genFileContent();
}

module.exports = Jekyll;