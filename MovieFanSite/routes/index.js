var express = require('express');
var router = express.Router();

const axios=require("axios");
const e = require('express');

//GENERATE YOUR OWN API KEY ON https://developers.themoviedb.org/
const apiKey="YOUR_API_KEY"
const apiBaseUrl="https://api.themoviedb.org/3"
const nowPlayingUrl=`${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`
const imageBaseUrl="https://image.tmdb.org/t/p/w300"


router.use((req,res,next)=>{
  res.locals.imageBaseUrl=imageBaseUrl;
  next()
})

/* GET home page. */
router.get('/', async (req, res, next)=> {

  try{
    const response=await axios.get(nowPlayingUrl)
    
    res.render("index",{movieData:response.data.results,pageTitle:"Now Playing"})
  }
  catch{

  }
  
});

router.get("/movie/:id",async (req,res,next)=>{

  try {
    const {id}=req.params
    const thisMovieUrl=`${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
    const response=await axios.get(thisMovieUrl)
    //res.json(response.data)
    res.render("single-movie",{movieData:response.data})
  } catch (error) {
    
  }
  
})

router.post("/search",async (req,res,next)=>{

  const {movieSearch,cat}=req.body
  const searchUrl=`${apiBaseUrl}/search/${cat}?query=${encodeURI(movieSearch)}&api_key=${apiKey}`;
  const response=await axios.get(searchUrl)

  if(cat==="person"){
    res.render("index",{movieData:response.data.results[0].known_for,pageTitle:"Search Results"})
  }
  else{
    res.render("index",{movieData:response.data.results,pageTitle:"Search Results"})
  }

  
  

  
})

module.exports = router;
