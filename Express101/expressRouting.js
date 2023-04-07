const express=require("express")
const app=express()

//app object has a few methods:
//HTTP verbs! REST verbs!
//CRUD app correspondence!
//1. get  app.get
//- DEFAULT for all browsers is get.
//2. post - CREATE  app.post
//3. delete - DELETE  app.delete
//4. put - UPDATE app.put
//5. all - I will accept any methodd app.all

//Take 2 args
//1. path
//2. callback to run if an HTTP request matches THIS verb
// is made to the path in #1

app.all("/",(req,res)=>{
    res.send("<h1>Welcome to the homepage!</h1>")
})

app.get("/",(req,res)=>{

    res.send("<h1>Hellooooo!</h1>")

})

app.post("/",(req,res)=>{

})

app.delete("/",(req,res)=>{
    
})

app.put("/",(req,res)=>{
    
})


app.listen(7000)