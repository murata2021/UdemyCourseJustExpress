const express=require("express")
const app=express()
const path=require("path")


//app comes with a use method
//use takes 1 arg
//the middleware you want to run
app.use(express.static("public"))

app.all("/",(req,res)=>{
    //Express handles the  basic headers (status-code, mime-types,etc.)! 
    //Express handles the end!

    res.sendFile(path.join(__dirname+"/node.html"))

})
app.all("*",(req,res)=>{
    res.status(404).send("<h1>Sorry, this page does not exist</h1>")
})
app.listen(3000)