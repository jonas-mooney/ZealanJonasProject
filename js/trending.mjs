const limit = 10;
const apiKey = 'KkQIVU7CgUTlND28O2bDZveA3Z8Vl1kz';

document.addEventListener('DOMContentLoaded', trendingGifs);
function trendingGifs() {
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}`
    let contentContainer = document.querySelector('#content');
    let contentHeader = document.querySelector('#contentHeader');
    let gifContainer = document.querySelector('#gifContainer');
    contentHeader.innerHTML = `<h1>Search and Save your Favorite Gifs</h1>`;

    fetch(url)
    .then(response => response.json())
    .then(content => {
      console.log(content.data)
      render(content.data)
    })
    .catch(err => {
      console.log(err)
    })

    function render(data) {
      for (let i=0; i<=data.length; i++) {
        console.log(data[i].images.downsized.url);
        gifContainer.innerHTML += `<img src='${data[i].images.downsized.url}'></img>`
      }
    }
}
 


function search() {
  document.querySelector('#searchButton').addEventListener('click', ev => {
    ev.preventDefault();
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=${limit}&q=`;
    let str = document.querySelector('#searchInput').value.trim();
    url = url.concat(str);
    console.log(url);
  })
}