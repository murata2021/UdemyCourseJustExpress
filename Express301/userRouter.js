const express=require("express")

//Creates a new router object
let userRouter=express.Router();

function validateUser(req,res,next){
    res.locals.validated=true
    next()
}

//validateUser is a middleware that will ONLY be added to this router
//In other words, the main router does not know about it.
userRouter.use(validateUser)

userRouter.get("/",(req,res,next)=>{
    res.json({
        msg:"User router works!"
    })
})

module.exports = userRouter;
