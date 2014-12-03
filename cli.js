#!/usr/bin/env node

var jkl  = require('./index');
var argv = process.argv.slice(2);
var file = process.argv[3];

var options = {};

function hasFile (filename) {
  return filename && filename.indexOf('-') !== 0;
}

if (argv.indexOf('-h') !== -1) {
  console.log([
    '',
    '  Usage',
    '    jkl <cmd> <options>',
    '  Commands',
    '    new <title> <options>',
    '    remove <title> <options>',
    '    publish <title>',
    '    ',
    '  Options',
    '    -d         Changes dir to _drafts'
  ].join('\n'));

  return;
}

if (argv.indexOf('-d') !== -1) {
  options.draft = true;
}

if (argv.indexOf('new') !== -1) {
  if (!hasFile(file)) return;

  options.title = file;
  options.create = true;

  jkl.new(options, function (err, res) {
    if (err) console.log('Error: ' + err);
    else console.log('File created: ' + res)
  });

  return;
}

if (argv.indexOf('remove') !== -1) {
  if (!hasFile(file)) return;

  options.title = file;
  options.create = false;

  jkl.remove(options, function (err, res) {
    if (err) console.log('Error: ' + err);
    else console.log('File removed: ' + res)
  });

  return;
}

if (argv.indexOf('publish') !== -1) {
  if (!hasFile(file)) return;

  options.title = file;
  options.create = false;
  options.draft = true;

  jkl.publish(options, function (err, res) {
    if (err) console.log('Error: ' + err);
    else console.log('File published: ' + res)
  });

  return;
}
