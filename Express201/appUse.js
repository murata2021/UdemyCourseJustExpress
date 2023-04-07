const express=require("express");
const app=express();

/*Express is 2 things
1.Router
2.Middleware that comprises a webframework

Req ---Middleware---> Res
Middleware Function is ANY function that has access to the req, res, next object.

Req ---Middleware---> Res
1. Request comes in
2. We need to validate the user, sometimes.
3. We need to store some things in the DB.
4. If there is data from the user we need to parse it and store it.
5. Response
*/

function validateUser(req,res,next){
    //get info out of the req object
    //do some stuff with the DB

    res.locals.validated=true;
    console.log("VALIDATED RAN!")
    next()
}
//This will run validatedUser on ALL paths, all methods!
// app.use(validateUser)

app.get("/",(req,res)=>{
    if(res.locals.validated) console.log(res.locals.validated)

    res.send("<h1>This is the main page!</h1>")
})

app.get("/admin",validateUser,(req,res)=>{

    if(res.locals.validated) console.log(res.locals.validated)

    res.send("<h1>This is the admin page!</h1>")
})


app.listen(4000)
