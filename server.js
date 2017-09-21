var http = require('http');
var url  = require('url');  
http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
	if (pathname ==='/'){
		res.writeHead(200, {'Content-Type':'text/plain'});
		res.end('Hello, I\'m an HTTP server.');
	} else if (pathname === '/about'){
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		res.end('About us\n');
	} else if (pathname === '/redirect') {
		// 重定向
		res.writeHead(302, {'Location':'/'});
		res.end();
	} else{
		res.writeHead(404, {'Content-Type':'text/plain'});
		res.end('Page not found\n');
	}  
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\n');
}).listen(1337, '127.0.0.1');


// var path = require('path');
// var http = require('http');
// var cluster = require('cluster');

// var NODE_ENV = process.env.NODE_ENV || 'production';
// var appName = path.basename(__dirname);
// var appPort = 9000;

// var numCPUs = require('os').cpus().length;

// if (cluster.isMaster) {
//     process.title = appName + ' master';
//     console.log(process.title, 'started');

//     // 根据 CPU 个数来启动相应数量的 worker
//     // for (var i = 0; i &lt; numCPUs; i++) {
//     //     cluster.fork();
//     // }

//     process.on('SIGHUP', function() {
//         // master 进程忽略 SIGHUP 信号
//     });

//     cluster.on('death', function(worker) {
//         console.log(appName, 'worker', '#' + worker.pid, 'died');
//         cluster.fork();
//     });

// } else {
//     process.title = appName + ' worker ' + process.env.NODE_WORKER_ID;
//     console.log(process.title, '#' + process.pid, 'started');

//     process.on('SIGHUP', function() {
//         // 接收到 SIGHUP 信号时，关闭 worker
//         process.exit(0);
//     });

//     http.Server(function(req, res) {
//         res.writeHead(200);
//         res.end('Worker ' + process.env.NODE_WORKER_ID);
//     }).listen(8000);
// }