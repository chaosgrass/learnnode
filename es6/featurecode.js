var http=require('http');
var url =require('url');
var util=require('util');
var child_process=require('child_process');

http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  //res.end(util.inspect(url.parse(req.url, true)));
  //res.end('Hello world!\n');
  var pathname = url.parse(req.url, true).pathname;
  var worker_proc = child_process.exec('ls '+pathname, 
    function(error, stdout, stderr) {
      //if (error) {
      //  console.log(error.stack);
      //  console.log('Error code: '+error.code);
      //  console.log('Signal received: '+error.signal);
      //}
      //console.log('stdout:'+stdout);
      //console.log('stderr:'+stderr);
      res.end(stdout);
    }
  );
  worker_proc.on('exit', function(code) {
    console.log('process exited:'+pathname);
  });
}).listen(8080);

console.log('Server running at http://localhost:8080/');
