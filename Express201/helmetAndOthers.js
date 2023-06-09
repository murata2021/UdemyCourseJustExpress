const express=require("express");
const app=express()

const helmet=require("helmet")

//Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
app.use(
    helmet()
)

app.use(express.static("public"))
//It parses incoming requests with JSON payloads and is based on body-parser. 
app.use(express.json())
//It parses incoming requests with URL-encoded payloads and is based on a body parser.
app.use(express.urlencoded({extended:false}))



app.post("/ajax",(req,res)=>{
    console.log(req.body)
    //any time you want to respond with json, you should use res.json
    res.json(["Test",1,2,3,4])
})

app.listen(3000)