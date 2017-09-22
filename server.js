var http=require('http')
var fs=require('fs')
var url=require('url')
// var Cookies=require('cookies')
// var port=process.env.PORT||8888;
var session={}

var server=http.createServer(function(request,response){
    // var cookies=new Cookies(request,response)
    var temp=url.parse(request.url,true);
    var path=temp.pathname 
    var query=temp.query
    var method=request.method
    
    if(path==='/'){
        var string=fs.readFileSync('./index.html')
        response.setHeader('Content-Type','text/html;charset=utf-8')
        // console.log(request.body)
        response.end(string)
        // response.setHeader('Content-Type','text/html;charset=utf-8')
    }else if(path==='/ajax'){   
        let body=[]
        console.log(request.query)
        request.on('data', (chunk) => {
            body.push(chunk);                      //=>获取响应的数据,chunk加密,chunk.toString()即为客户端发送过来的数据
          }).on('end', () => {
            body = Buffer.concat(body).toString();
            response.end(body);  //=>发送数据
          });
    }else if(path==='/data'){
        var data=fs.readFileSync('./data.json')
        response.end(data) 
        // let body=[]
        // console.log(request.query)
        // request.on('data', (chunk) => {
        //     body.push(chunk);                      //=>获取响应的数据,chunk加密,chunk.toString()即为客户端发送过来的数据
        //   }).on('end', () => {
        //     body = Buffer.concat(body).toString();
        //     response.end(body);  //=>发送数据
        //   });
    }else{
        response.statusCode=404;
        response.setHeader('Content-Type','text/html;charset=utf-8')
        response.end('找不到路径,请检查路径是否正确')
        // console.log(path)
        // response.end('Not find a')
    }


}).listen(8888, '127.0.0.1')

console.log('服务器已经为最最聪明的你开启,打开8888端口去搞定一切吧')



// var http = require('http');
// var url  = require('url');  
// http.createServer(function (req, res) {
//     var pathname = url.parse(req.url).pathname;
// 	if (pathname ==='/'){
// 		res.writeHead(200, {'Content-Type':'text/plain'});
// 		res.end('Hello, I\'m an HTTP server.');
// 	} else if (pathname === '/about'){
// 		res.writeHead(200, {
// 			'Content-Type': 'text/plain'
// 		});
// 		res.end('About us\n');
// 	} else if (pathname === '/redirect') {
// 		// 重定向
// 		res.writeHead(302, {'Location':'/'});
// 		res.end();
// 	} else{
// 		res.writeHead(404, {'Content-Type':'text/plain'});
// 		res.end('Page not found\n');
// 	}  
// //   res.writeHead(200, {'Content-Type': 'text/plain'});
// //   res.end('Hello World\n');
// }).listen(1337, '127.0.0.1');

