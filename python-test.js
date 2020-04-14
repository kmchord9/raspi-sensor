var {PythonShell} = require('python-shell');
var pyshell = new PythonShell('temp.py');


pyshell.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement)
  console.log(message);
});
