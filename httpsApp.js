

// var express = require('express');
// var https = require('https');
// var http = require('http');
// var fs = require('fs');
//
// // This line is from the Node.js HTTPS documentation.
// var options = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// };
//
// // Create a service (the app object is just a callback).
// var app = express();
//
// // Create an HTTP service.
// http.createServer(app).listen(80);
// // Create an HTTPS service identical to the HTTP service.
// https.createServer(options, app).listen(443);
//

// var https = require('https');
// var fs = require('fs');
//
// var options = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// };
//
// var a = https.createServer(options, function (req, response) {
//   response.writeHead(200, {"Content-Type": "text/html"});
//   response.write("<html>");
//   response.write('<body>');
//   response.write('<h1>');
//   response.write('Server is working');
//   response.write('</h1>');
//   response.write('</body>');
//   response.write('</html>');
//   response.write('login.html');
//   response.end();
// }).listen(8000);
//
// console.log("Server running at https://127.0.0.1:8000/");

// var https = require('https');
// var fs = require('fs');
//
// var options = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// };
//
// var a = https.createServer(options, function (req, res) {
//   res.writeHead(200);
//   res.end("hello world\n");
// }).listen(8000);
