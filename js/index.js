const limit = 30;
const apiKey = 'KkQIVU7CgUTlND28O2bDZveA3Z8Vl1kz';
const favorites = []

document.addEventListener('DOMContentLoaded', trendingGifs);
const contentContainer = document.querySelector('#content');
const contentHeader = document.querySelector('#contentHeader');
const gifContainer = document.querySelector('#gifContainer');

document.querySelector('#trendingButton').addEventListener('click', trendingGifs);

function trendingGifs() {
  gifContainer.innerHTML = null;
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}`
    contentHeader.innerText = "Search and Save your Favorite Gifs";

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
        gifContainer.innerHTML += `<div id='${data[i].id}' class='gifDiv'><img class='mainImage' src='${data[i].images.downsized.url}'><img class='iconImage' onclick='addToFavs(${data[i].id})' src='./images/hollowHeart.png'></div>`

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
    contentHeader.innerText = str;

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
        gifContainer.innerHTML += `<div id='${data[i].id}' class='gifDiv'><img class='mainImage' src='${data[i].images.downsized.url}'><img class='iconImage' onclick='addToFavs(${data[i].id})' src='./images/hollowHeart.png'></div>`
      }
    }
  })


function addToFavs(id) {
  console.log(id)
  const container = document.getElementById(id.id);
  console.log(container)
  // $(container).children('.iconImage')[0] = `<img class='iconImage' onclick='removeToFavs(${data[i].id})' src='./images/fullHeart.png'>`;
  // change icon to full red heart
  // Gif id to local storage
}