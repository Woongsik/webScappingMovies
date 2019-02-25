const fetch = require('node-fetch');
const cheerio = require('cheerio')

const searchUrl = 'https://www.imdb.com/find?&s=tt&ttype=ft&ref_=fn_ft&q='; //s=tt&exact=true&ref_=fn_al_tt_ex   
                                             
const movieUrl = 'https://www.imdb.com/title/';

const searchCache = {};
const movieCache = {};


function searchMovies(searchTerm) {
    if(searchCache[searchTerm]){
        console.log("serving from cache: "+ searchTerm)
        return Promise.resolve(searchCache[searchTerm])
    }

    return fetch( searchUrl + searchTerm)
        .then( response => response.text())
        .then( body => {
            const movies = [];
            const $ = cheerio.load(body)

            $('.findResult').each( function(i, element){
                const $element = $(element);
                const $image = $element.find('td.primary_photo a img');
                const $title = $element.find('td.result_text a')
                
                if ($title.attr('href').match(/title\//)){
                    const imdbId = $title.attr('href').match(/title\/(.*)\//)[1]

                    const movie = {
                        image: $image.attr('src'),
                        title: $title.text(),
                        imdbId
                    }
    
                    movies.push(movie)
                }
            })
            
            searchCache[searchTerm] = movies;
            return movies;         
        })
}


function getMovie(imdbId){

    if(movieCache[imdbId]){
        console.log("serving from cache: "+ imdbId)
        return Promise.resolve(movieCache[imdbId])
    }

    return fetch( movieUrl + imdbId + '/')
        .then( response => response.text())
        .then( body => {
            
            const $ = cheerio.load(body.toString())
            const $title = $('div.title_wrapper h1').text()
            const title = $title.trim()

            const rating = $('div.ratingValue').text().trim()
            const runTime = $('div.subtext').find('time').text().trim().split("\n")[0]

            let genres = [];
            let publishDate;
            $('div.subtext').find('a').each( (index, element) => {
                if ( index !==  ( $('div.subtext').find('a').length -1) ){
                    const genre = $(element).text()	
                    genres.push(genre)
                }else {
                    publishDate = $(element).text().trim()
                }
            })

            const posterImg = $('div.poster a img').attr('src')
            const summaryText = $('div.summary_text').text().trim()

            const $summaryItem = $('div.credit_summary_item');
            const director = $summaryItem.first().contents().text().split(":")[1].trim()
            const writer = $summaryItem.first().next().contents().text().split(":")[1].split("|")[0].trim()
            const stars = $summaryItem.last().contents().text().split(":")[1].split("|")[0].trim()
            
            const storyLine = $('div#titleStoryLine').find('div.inline.canwrap').first().contents().text().trim()

            const oldUrl = $('div.slate a').first().attr('href').split("/").pop();
            const trailerUrl = "https://www.imdb.com/videoplayer/" + oldUrl;

            const movie =  {
                title,
                rating,
                runTime,
                genres,
                publishDate,
                posterImg,
                summaryText,
                director,
                writer,
                stars,
                storyLine,
                trailerUrl
            }

            movieCache[imdbId] = movie;
            return movie;
        })
}


module.exports = {
    searchMovies,
    getMovie
}


