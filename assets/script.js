let searchForm = document.querySelector("#search-form");
let searchInput = document.querySelector("#searchInput");
let restaurantCard = document.querySelector("#restaurant-card");
let dogBreeds = document.querySelector("#dog-breeds");
//functions
function init() {
  fetch("https://dog.ceo/api/breeds/list/all")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(Object.keys(data.message));
      let breeds = Object.keys(data.message);
      breeds.forEach((breed) => {
        let optTag = document.createElement("option");
        optTag.innerHTML = `<option value="${breed}">${breed}</option>`;
        dogBreeds.append(optTag);
      });
    });
}

function handleFormSubmit(event) {
  event.preventDefault();
  restaurantCard.innerHTML = "";

  let requestUrl = `https://worldwide-restaurants.p.rapidapi.com/search?language=en_US&limit=30&location_id=35805&currency=USD`;
  fetch(requestUrl, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "77c49fa958msh4ad3388de6c9df6p1e0636jsn0b5317d9f072",
      "X-RapidAPI-Host": "worldwide-restaurants.p.rapidapi.com",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
        data.results.data.forEach((restaurant, index) => {
          if (index < 10) {
            let divTag = document.createElement("div");
            divTag.setAttribute("class", "p-2");
            divTag.innerHTML = `<h2> ${restaurant.name} </h2>`
            divTag.innerHTML +=  `<img class="" src="${restaurant.photo.images.original.url}">`;
            restaurantCard.append(divTag);
          }
        });
    });
}

//event listeners
// init();

searchForm.addEventListener("submit", handleFormSubmit);
