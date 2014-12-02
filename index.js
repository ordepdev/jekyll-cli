#!/usr/bin/env node

var fs = require('fs');
var Jekyll = require('./bin');

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
