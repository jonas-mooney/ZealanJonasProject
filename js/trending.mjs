
document.addEventListener('DOMContentLoaded', trendingGifs);
function trendingGifs() {
    const apiKey = 'KkQIVU7CgUTlND28O2bDZveA3Z8Vl1kz';
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=3`
    let gifContainer = document.querySelector('#gifContainer');
    gifContainer.innerHTML = `<h1>Search and Save your Favorite Gifs</h1>`;

    fetch(url)
    .then(response => response.json())
    .then(content => {
      render(content.data)
      console.log(content.data)
    })
    .catch(err => {
      console.log(err)
    })

    function render(data) {
      for (let i=0; i<=data.length; i++) {
        console.log(data[i].images.downsized.url);
        
      }
    }



}
