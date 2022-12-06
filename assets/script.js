let searchForm = document.querySelector("#search-form");
let searchInput = document.querySelector("#searchInput");
let restaurantCard = document.querySelector("#restaurant-card");
let dogBreeds = document.querySelector("#dog-breeds");
let apiKeys = [
  "4eef0a8f66msh0e3d9145b05fdc5p14c740jsn611969b39db8", //kevin-[0]
  "de207c4a1bmsh2343afc820503aap1170efjsncd8fc64f4fe7", //tyler-[1]
  "bc1f799ce0mshe02c6b2a2eb17b3p1a13a9jsn5c26cb1c4ec5", //edgar-[2]
  "1f6f2a5f04mshac3a3c4bbb94796p148baajsn5fbc601de50c", //zach-[3]
  "77c49fa958msh4ad3388de6c9df6p1e0636jsn0b5317d9f072", //aaron
  "de3f753eccmshe0f5fd91ea2d6fcp17c1b8jsn931676598f7c", //edgar2-[4]
  // use for testing edgar12.3.22
  "5e5f6ede44msh62c3ce20cb8588cp1b3edejsn7dcbd4e52389", //edgar3-[5]
  "64e11e875fmsh272baa4a60cfe2dp10d5c3jsn0def253d0897", //edgar4-[6]
];

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
  let locationRequestUrl = "https://worldwide-restaurants.p.rapidapi.com/typeahead?q=Chicago&language=en_US&currency=USD";
  fetch(locationRequestUrl, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": apiKeys[0],
      "X-RapidAPI-Host": "worldwide-restaurants.p.rapidapi.com",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (location) {
      let locationID = location.results.data[0].result_object.location_id;
      console.log(locationID);
      let requestUrl = `https://worldwide-restaurants.p.rapidapi.com/search?language=en_US&limit=30&location_id=${locationID}&currency=USD`;
      fetch(requestUrl, {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key": apiKeys[1],
          "X-RapidAPI-Host": "worldwide-restaurants.p.rapidapi.com",
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          let restaurants = data.results.data;
          let filteredRestaurants = restaurants.filter(function (el) {
            return el.price_level === "$$$$";
          });
          console.log(filteredRestaurants);
          filteredRestaurants.forEach((restaurant, index) => {
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
