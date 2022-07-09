  
  const root = document.querySelector('.autocomplete')
  
root.innerHTML = `
<label><b> Search for a movie </b> <label>
<input class="input" />
<div class="dropdown">
<div class="dropdown-menu">
<div class="dropdown-content results"> </div>
</div>
</div>

`


const resultsWrapper = document.querySelector('.results')
const dropdown = document.querySelector('.dropdown')
const input = document.querySelector('input');



const fetchData = async searchTerm => {
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: 'd9835cc5',
        s: searchTerm
      }
    });

    if (response.data.Error) {
        return []
    }
return response.data.Search  

};



  const onInput = async event => {
    const movies = await fetchData(event.target.value); 
    if (!movies.length) {
        dropdown.classList.remove("is-active")
    return;
    } 

    resultsWrapper.innerHTML = " "

dropdown.classList.add('is-active')

    movies.forEach(movie => {

        const option = document.createElement('a')
        const imgsrc = movie.Poster === 'N/A' ? " " :  movie.Poster
        option.classList.add("dropdown-item")
        
option.innerHTML = `
<img src="${imgsrc}" />
${movie.Title}

`
option.addEventListener('click', () => {
    dropdown.classList.remove("is-active")
    input.value = movie.Title
    onMovieSelect(movie);
})
;
resultsWrapper.appendChild(option)
    
});
  }

    input.addEventListener('input', debounce(onInput, 500))

    document.addEventListener('click', event => {


        if (!root.contains(event.target)) {
            dropdown.classList.remove("is-active")
        }
        
    })


    const onMovieSelect = async movie => {
        let id = movie.imdbID
        const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: 'd9835cc5',
        i: id
      }
      
    }

    );

document.querySelector('#summary').innerHTML = movieTemplate(response.data)
}
    const movieTemplate = (movieDetail) => {
return `
<article class="media"> 
<figure class="media-left">
<p class="image">
<img src="${movieDetail.Poster}" />


</p>
</figure>
<div ="media-content">
<div ="content">
<h1>${movieDetail.Title} </h1>
<h4>${movieDetail.Genre}</h4>
<p>${movieDetail.Plot}</p>
</div>
</div>
</article>
<article="notification is-primary">
<p class="title"> ${movieDetail.Awards} </p>
<p class="subtitle"> Awards </p>
</article>
<article="notification is-primary"
<p class="title"> ${movieDetail.BoxOffice} </p>
<p class="subtitle"> Box Offices </p>
</article>
<article="notification is-primary"
<p class="title"> ${movieDetail.Metascore} </p>
<p class="subtitle"> Metascore</p>
</article>
<article="notification is-primary"
<p class="title"> ${movieDetail.imdbRating} </p>
<p class="subtitle"> IMDB Rating </p>
</article>
<article="notification is-primary"
<p class="title"> ${movieDetail.Ratings[1].Value} </p>
<p class="subtitle"> Rotten Tomatoes </p>
</article>


`


}     
    