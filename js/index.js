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
        gifContainer.innerHTML += `<div class='gifDiv'><img class='mainImage' src='${data[i].images.downsized.url}'><img class='iconImage' src='./images/hollowHeart.png'></div>`
      }
    }
}
 


$('#searchBar').keypress(function(event){
  if(event.keyCode == '13'){
    $('#searchButton').click()
  }
});

  document.querySelector('#searchButton').addEventListener('click', ev => {
    ev.preventDefault();
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=${limit}&q=`;
    let str = document.querySelector('#searchInput').value;
    
    url = url.concat(encodeURI(str));
    console.log(str)
    console.log(url)
    gifContainer.innerHTML = null;
    contentHeader.innerHTML = `<h1>${str}</h1>`;

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
        gifContainer.innerHTML += `<div class='gifDiv'><img class='mainImage' src='${data[i].images.downsized.url}'><img class='iconImage' src='./images/hollowHeart.png'></div>`
      }
    }
  })

