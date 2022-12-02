let searchForm = document.querySelector("#search-form");
let searchInput = document.querySelector("#searchInput");
let restaurantCard = document.querySelector("#restaurant-card");
let dogBreeds = document.querySelector("#dog-breeds");
// let cuisineType = document.querySelector("");
// let location = document.querySelector("");
// let priceRange = document.querySelector("");

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
  let locationRequestUrl = "https://worldwide-restaurants.p.rapidapi.com/typeahead?q=Atlanta&language=en_US&currency=USD";
  fetch(locationRequestUrl, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "bc1f799ce0mshe02c6b2a2eb17b3p1a13a9jsn5c26cb1c4ec5",
      "X-RapidAPI-Host": "worldwide-restaurants.p.rapidapi.com",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (location) {
let locationID = location.results.data[0].result_object.location_id;
console.log(locationID)
      let requestUrl = `https://worldwide-restaurants.p.rapidapi.com/search?language=en_US&limit=30&location_id=${locationID}&currency=USD`;
      fetch(requestUrl, {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key": "bc1f799ce0mshe02c6b2a2eb17b3p1a13a9jsn5c26cb1c4ec5",
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
              divTag.innerHTML = `<h2> ${restaurant.name} </h2>`;
              divTag.innerHTML += `<img class="" src="${restaurant.photo.images.original.url}">`;
              restaurantCard.append(divTag);
            }
          });
        });
    });
}

//event listeners
// init();

searchForm.addEventListener("submit", handleFormSubmit);
