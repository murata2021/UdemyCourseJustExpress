const express=require("express")

//Creates a new router object
let router=express.Router();

//instead of
//app.get(...)
//router.get(...)
router.get("/",(req,res,next)=>{
    res.json({
        msg:"Router works!"
    })
})

module.exports = router;
