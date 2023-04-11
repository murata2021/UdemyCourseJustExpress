const path=require("path")

const express=require("express")
const app=express()

const helmet=require("helmet")
const cookieParser=require("cookie-parser")

app.use(helmet())

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use((req,res,next)=>{
    if(req.query.msg==="fail"){
        res.locals.msg="Sorry. This username and password combination does not exist."
    }
    else{
        res.locals.msg=""
    }
    next();
})

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

app.get("/",(req,res,next)=>{
    res.send("Sanity Check")
})


app.get("/login",(req,res,next)=>{
    //the req object has a query property in Express
    //req.query is an object, with a property of every key in the query string
    //the query string is where you put insecure data
    console.log(req.query)
    res.render("login")
})


app.post("/process_login",(req,res,next)=>{
    //req.body is made by urlencoded whic parses the http message for sent data!
    //res.json(req.body)
    const password=req.body.password;
    const username=req.body.username;

    //check the db to see if user credentials are valid.
    //if they are valid...
        //- save their username in a cookie
        //- is send them to the welcome page

    if (password==="x"){
        //res.cookie takes at least 2 args
        //1. name of the cookie
        //2. value to set it to
        res.cookie("username",username)
        //res.redirect takes 1 arg:
        //1. where to send the browser
        res.redirect("/welcome")
    }
    else{
        //The "?" is a special character in a URL
        res.redirect("/login?msg=fail&test=hello")
    }
})

app.get("/welcome",(req,res,next)=>{
    //req.cookies object will have a property for every named cookie
    //that has been set.
    const {username}=req.cookies
   
    res.render("welcome",{username})
})
//in a route, anytime something has a : in front of it is a wildcard.
//wildcard will match anything in that slot.
app.get("/story/:storyId",(req,res,next)=>{
    //the req,params object always exists
    //it will have a property for each wildcard in the route
    const {storyId}=req.params
    res.send(`<h1>Story ${storyId}</h1>`)
})

app.get("/story/:storyId/:link",(req,res,next)=>{
    //the req,params object always exists
    //it will have a property for each wildcard in the route
    const {storyId}=req.params
    res.send(`<h1>Story ${storyId} - ${req.params.link} </h1>`)
})

app.get("/statement",(req,res,next)=>{

    //This will render the statement IN the browser
    //res.sendFile(path.join(__dirname,'userStatements/BankStatementChequing.png'))

    //app has a download method! Takes 2 args:
    //1. filename
    //2. optionally, what you want the filename to download as
    //3. optionally, callback which comes with the error object
    //download is etting the headers!
    //1. content-disposition to attachement, with a filename of the 2nd arg
    res.download(path.join(__dirname,'userStatements/BankStatementChequing.png'))

    //attachment ONLY sets the headers for content-disposition to attachement
    //IF, you provide a file, it will also set the filename

    //res.attachment(path.join(__dirname,'userStatements/BankStatementChequing.png'))


})

app.get("/logout",(req,res,next)=>{

    //res.clearCookie() takes 1 arg;
    // 1. Cookie to clear (by name)
    res.clearCookie("username");
    res.redirect("/login")
})

app.listen(3000)