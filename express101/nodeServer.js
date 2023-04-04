//http os native to NodeJS. We just have to ask for it.
const http = require("http");
//File System module.It is a built-in module. It gives node access to THIS computers file system.
const fs=require("fs");

//the http module has a createServer method
//takes 1 arg:
//1. callback, callback has 2 args: req, res

const server=http.createServer((req,res)=>{
    console.log(req.url);
    if(req.url==="/"){
        //if the user wants the home page! 
        //res = our way of responding to the requester
        //http message
        //1. start-line -CHECK
        //2. header
        //3. body

        //writeHead takes 2 args:
        //1. status code
        //2. object for the mime -type
        res.writeHead(200,{'content-type':'text/html'});
        // res.write("<h1>This is the home page!</h1>");
        const homePageHtml=fs.readFileSync("./node.html")
        res.write(homePageHtml)
        console.log(homePageHtml)
        res.end();
        
    }
    else if(req.url="/node.png"){
        res.writeHead(200,{'content-type':'img/png'});
        const image=fs.readFileSync("./node.png")
        res.write(image)
        console.log(image)
        res.end();
    }
    else{
        res.writeHead(404,{'content-type':'text/html'});
        res.write("<h1>Sorry it is not the page you are looking for!</h1>");
        res.end();
    }
    
});

//createServer returns an object with a listen method
//listen takes 1 arg:
//1. port to listen for http traffic on
server.listen(5000);
