var jkl  = require('./index');
var argv = process.argv.slice(2);

var options = {};

if (argv.indexOf('-h') !== -1) {
  console.log([
    '',
    '  Usage',
    '    jkl new <title>',
    '    ',
    '  Options',
    '    -d         Changes dir to _drafts'
  ].join('\n'));
  return;
}

if (argv.indexOf('-d') !== -1) {
  options.isDraft = true;
}

if (argv.indexOf('new') !== -1) {
  if (!process.argv[3]) return;

  jkl.new(process.argv[3], options, function (err, res) {
    if (err) console.log('Error: ' + err);
    else console.log('File created: ' + res)
  });
  return;
}
