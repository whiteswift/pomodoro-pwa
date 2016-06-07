var https = require('https');
var fs = require('fs');

var options = {
  key: { pem: fs.readFileSync('key.pem'), passphrase: '1234' },
  cert: fs.readFileSync('cert.pem')
};
var a = https.createServer(options, function (req, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<html>");
  response.write('<body>');
  response.write('<h1>');
  response.write('Server is working');
  response.write('</h1>');
  response.write('</body>');
  response.write('</html>');
  response.write('login.html');
  response.end();
}).listen(8000);

console.log("Server running at https://127.0.0.1:8000/");
