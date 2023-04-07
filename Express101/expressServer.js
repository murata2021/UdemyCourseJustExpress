//NODEJS is the language
//Express is node, a node module
//http is a native module, express is a 3rd party module
const express=require("express");
//An app is the express function (createApplication inside the Express module)
//invoked and is an Express application
const app=express();

//serve up static files! Only 1 line ... take that nodejs
app.use(express.static(public))

//all is a method, it thaes two args
//1.route
//2. callback to run if the route is requested

app.all("*",(req,res)=>{
    //Express handles the  basic headers (status-code, mime-types,etc.)! 
    //Express handles the end!

    return res.send("<h1>This is the homepage!</h1>")
})


app.listen(2000)
console.log("App is listening on port 2000...")
