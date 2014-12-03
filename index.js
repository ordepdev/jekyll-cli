var fs = require('fs');
var Jekyll = require('./bin');

module.exports.new = function (options, cb) {
    var jkl = new Jekyll({
        title:   options.title,
        draft:   options.draft,
        create:  options.create
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

module.exports.remove = function (options, cb) {
    var jkl = new Jekyll({
        title: options.title,
        draft: options.draft,
        create: options.create
    });

    if (!fs.existsSync(jkl.path)) {
        return cb('file not found');
    }

    fs.unlinkSync(jkl.path);
    cb(null, jkl.path);
}

module.exports.publish = function (options, cb) {
    var jkl = new Jekyll({
        title: options.title,
        draft: options.draft,
        create: options.create
    });

    var postsFolder = '_posts';
    var newPath = jkl.path.replace(jkl.folder, postsFolder);

    !fs.existsSync(postsFolder) && fs.mkdirSync(postsFolder);

    if (!fs.existsSync(jkl.path)) {
        return cb('file not found');
    }

    fs.renameSync(jkl.path, newPath);
    cb(null, newPath);
}
