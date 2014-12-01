var jkl = require('./');
var argv = process.argv.slice(2);

if (argv.indexOf('-d') !== -1) {
        
} 

jkl.new(process.argv[2], {}, function (err, res) {
    if (err) console.log('Error: ' + err);
    else console.log('File created: ' + res)
});
