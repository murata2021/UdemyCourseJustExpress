const path=require("path")

const express=require("express")
const app=express()

const helmet=require("helmet")
app.use(helmet({
    contentSecurityPolicy: false,
}));

// serve up static files
app.use(express.static("public"))
//parse json and urlencoded data into req.body
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// app.set(), takes 2 args:
// 1. key
// 2. value
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

/*
1. Express as we know it happens. This file.
2. We define a view engine.
    -EJS
    -Mustache
    -Handlebars
    -Jade/Pug
 3. Inside one of our routes, we have a res.render
 4. We pass that res.render 2 things:
    -the file we want to use.
    -the data we want to send to that file.
 5. Express uses the node module for our specified view engine and parses the file
 - that means, it takes the HTML/JS/CSS and combines it with whatever 'node' there is in the file
 6. The final result of this process is a compiled product of the things the browser can read
 - HTML/JS/CSS
 */

const validateUser=(req,res,next)=>{
    res.locals.validated=true;
    next();
}

app.use(validateUser)
app.get("/",(req,res,next)=>{
    //the data in the second arg is going to be appended to res.locals
    res.render("index",{
        msg:"Success!",
    })
})

app.listen(3000)