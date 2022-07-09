  
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