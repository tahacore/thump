var http=require('http'),fs=require('fs'),path=require('path');
var root=__dirname;
var types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.ico':'image/x-icon','.json':'application/json'};
http.createServer(function(req,res){
  var url=decodeURIComponent(req.url.split('?')[0]);
  if(url==='/')url='/index.html.html';
  var file=path.join(root,url);
  if(!file.startsWith(root)){res.writeHead(403);res.end();return;}
  fs.readFile(file,function(err,data){
    if(err){res.writeHead(404);res.end('Not found');return;}
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});
    res.end(data);
  });
}).listen(8123,'127.0.0.1',function(){console.log('preview on http://localhost:8123');});
