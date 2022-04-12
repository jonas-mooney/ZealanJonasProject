const limit = 30;
const apiKey = 'KkQIVU7CgUTlND28O2bDZveA3Z8Vl1kz';
const key = 'favorites';
let inTrending = false;
let inFavorites = false


document.addEventListener('DOMContentLoaded', trendingGifs);
const contentContainer = document.querySelector('#content');
const contentHeader = document.querySelector('#contentHeader');
const gifContainer = document.querySelector('#gifContainer');

document.querySelector('#trendingButton').addEventListener('click', trendingGifs);

function trendingGifs() {
  inFavorites = false
  inTrending = true;
  gifContainer.innerHTML = null;
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}`
    contentHeader.innerText = "Search and Save your Favorite Gifs";

    fetch(url)
    .then(response => response.json())
    .then(content => {
      render(content.data)
    })
    .catch(err => {
      console.log(err)
    })

    // function render(data) {
    //   for (let i=0; i<=data.length; i++) {
    //     gifContainer.innerHTML += `<div id='${data[i].id}' class='gifDiv'><img class='mainImage' src='${data[i].images.downsized.url}'><img class='iconImage' onclick='addToFavs("${data[i].id}"")' src='./images/hollowHeart.png'></div>`;
    //   }
    // }
    function render(data) {
      let x = JSON.parse(localStorage.getItem(key));
      if(x == null) {
        localStorage.setItem(key, JSON.stringify([]))
        x = JSON.parse(localStorage.getItem(key));
      }
      for(let i=0; i<=data.length; i++) {
        let temp = false;
        for (let j=0; j<=x.length; j++) {
          if(data[i].id == x[j]) {
            temp = true
          }
        }
        if(temp) {
          gifContainer.innerHTML += `<div id='${data[i].id}' class='gifDiv'><img class='mainImage' src='${data[i].images.downsized.url}'><img class='iconImage' onclick='removeFromFavs("${data[i].id}")' src='./images/fullHeart.png'></div>`
        }
        else {
          gifContainer.innerHTML += `<div id='${data[i].id}' class='gifDiv'><img class='mainImage' src='${data[i].images.downsized.url}'><img class='iconImage' onclick='addToFavs("${data[i].id}")' src='./images/hollowHeart.png'></div>`
        }
      }
    }
}


$('#searchBar').keypress(event => {
  if(event.keyCode == 13) {
    $('#searchButton').click()
  }
});

  document.querySelector('#searchButton').addEventListener('click', ev => {
    inFavorites = false
    inTrending = false

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
        gifContainer.innerHTML += `<div id='${data[i].id}' class='gifDiv'><img class='mainImage' src='${data[i].images.downsized.url}'><img class='iconImage' onclick='addToFavs("${data[i].id}")' src='./images/hollowHeart.png'></div>`
      }
    }
  })

document.querySelector('#favoritesButton').addEventListener('click', favoriteGifs);

function favoriteGifs() {
  inTrending = false
  inFavorites = true

  contentHeader.innerText = "Favorites";
  gifContainer.innerHTML = null;
  let storageFavorites = JSON.parse(localStorage.getItem(key));
  for (let id in storageFavorites) {
    let url = `https://api.giphy.com/v1/gifs/${storageFavorites[id]}?api_key=${apiKey}`;
    fetch(url)
    .then(response => response.json())
    .then(content => {
      render(content.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  function render(data) {
      gifContainer.innerHTML += `<div id='${data.id}' class='gifDiv'><img class='mainImage' src='${data.images.downsized.url}'><img class='iconImage' onclick='removeFromFavs("${data.id}")' src='./images/fullHeart.png'></div>`;
  }
}

function addToFavs(containerId) {
  const container = document.getElementById(containerId)
  let x = JSON.parse(localStorage.getItem(key));
  if (!x) {
    localStorage.setItem(key, JSON.stringify([containerId]))
  }
  else {
    x.push(containerId)
    localStorage.setItem(key, JSON.stringify(x))
  }
  $(container).children()[1].remove()
  $(container).append(`<img class='iconImage' onclick='removeFromFavs("${containerId}")' src='./images/fullHeart.png'>`)
  removeDuplicates()
}

function removeFromFavs(containerId) {
  const container = document.getElementById(containerId)
  let store = JSON.parse(localStorage.getItem(key));
  let result = store.filter(id => id != containerId);
  localStorage.setItem(key, JSON.stringify(result));
  if(inFavorites) {
    $(container).remove()
  }
  else {
    $(container).children()[1].remove()
    $(container).append(`<img class='iconImage' onclick='addToFavs("${containerId}")' src='./images/hollowHeart.png'>`)
  }
  removeDuplicates()
}

function removeDuplicates() {
  let store = JSON.parse(localStorage.getItem(key));
  store = [...new Set(store)];
  localStorage.setItem(key, JSON.stringify(store));
}