const limit = 30;
const apiKey = 'KkQIVU7CgUTlND28O2bDZveA3Z8Vl1kz';

document.addEventListener('DOMContentLoaded', trendingGifs);
const contentContainer = document.querySelector('#content');
const contentHeader = document.querySelector('#contentHeader');
const gifContainer = document.querySelector('#gifContainer');

document.querySelector('#trendingButton').addEventListener('click', trendingGifs);

function trendingGifs() {
  gifContainer.innerHTML = null;
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}`
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
        gifContainer.innerHTML += `<img src='${data[i].images.downsized.url}'></img>`
      }
    }
}
 



  document.querySelector('#searchButton').addEventListener('click', ev => {
    ev.preventDefault();
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=${limit}&q=`;
    let str = document.querySelector('#searchInput').value.trim();
    url = url.concat(str);
    gifContainer.innerHTML = null;
    contentHeader.innerHTML = `<h1>${document.querySelector('#searchInput').value}</h1>`;

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
      for (let i in data) {
        gifContainer.innerHTML += `<img src='${data[i].images.downsized.url}'></img>`
      }
    }
  })


  // Our latest test