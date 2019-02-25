const express = require('express')
const scraper = require('./scraper');

const app = express()
app.use(express.static(__dirname+"/Publichtml"));


app.get('/index', (req,res)=> {
    console.log("'/' request")
    res.json({"message": "connection successful"})
})


app.get('/search/:title', (req,res)=>{
    console.log("'/search/:title' request")
    const title = req.params.title;
    scraper.searchMovies(title)
        .then( movies => {
            res.json(movies)
        })
})


app.get('/movie/:imdbId', (req,res)=>{
    console.log("/movie/:imdbId' request")
    const imdbId = req.params.imdbId;
    scraper.getMovie(imdbId)
        .then( movie => {
            return res.json(movie)
        }).catch(error => {
            return res.status(409).json({"message":"error with "+ error})
        })
})


//server
const port = process.env.PORT || 5000;

app.listen(port, ()=> {
    console.log('Listening on ' + port)
})