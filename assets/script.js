let searchForm = document.querySelector("#search-form");
let priceDropdown = document.querySelector("#format-input-price");
let cuisineDropdown = document.querySelector("#format-input-cuisine");
let searchInput = document.querySelector("#searchInput");
let restaurantCard = document.querySelector("#restaurant-card");
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
let restaurants = [];
let masterCuisineArr = [""];
let filteredRestaurants = [];

// let cuisineType = document.querySelector("");
// let location = document.querySelector("");
// let priceRange = document.querySelector("");

//functions

function handleFormSubmit(event) {
  event.preventDefault();
  restaurantCard.innerHTML = "";
  let city = document.querySelector("#city").value;
  let locationRequestUrl = `https://worldwide-restaurants.p.rapidapi.com/typeahead?q=${city}&language=en_US&currency=USD`;
  fetch(locationRequestUrl, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": apiKeys[3],
      "X-RapidAPI-Host": "worldwide-restaurants.p.rapidapi.com",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (location) {
      let locationID = location.results.data[6].result_object.location_id;
      console.log(locationID);
      let requestUrl = `https://worldwide-restaurants.p.rapidapi.com/search?language=en_US&limit=30&location_id=${locationID}&currency=USD`;
      fetch(requestUrl, {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key": apiKeys[6],
          "X-RapidAPI-Host": "worldwide-restaurants.p.rapidapi.com",
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data.price_level);
          document.querySelectorAll(".form-input").forEach((select) => {
            select.style.display = "block";
          });
          restaurants = data.results.data;
          restaurants.forEach((restaurant, index) => {
            if (index < 10) {
              let pTag = document.createElement("p");
              pTag.setAttribute("class", "p-2");
              pTag.innerHTML = `<h2> ${restaurant.name} </h2>`;
              pTag.innerHTML += `<img class="" src="${restaurant.photo.images.original.url}">`;
              pTag.innerHTML += `<h3> ${restaurant.cuisine[0].name}`;
              pTag.innerHTML += `<h4> ${restaurant.price_level}`;
              pTag.innerHTML += `<h5> ${restaurant.rating}`;
              pTag.innerHTML += `<h6> ${restaurant.address}`;
              pTag.innerHTML += `<h6> ${restaurant.phone}`;
              restaurantCard.append(pTag);

              // edgar martinez 12.5.22
              // creates cuisine dropdown
            }
          });
          console.log(data);
          createCuisine(data);
          filteredRestaurants = [...restaurants];
        });
    });
}
function createCuisine(data) {
  populateCuisineOptions(createCuisineArr(data));
}
function populateCuisineOptions(cuisineArr) {
  console.log("cuisine", cuisineArr);
  for (let i = 0; i < cuisineArr.length; i++) {
    let cuisineEl = document.createElement("option");
    cuisineEl.setAttribute("value", cuisineArr[i]);
    cuisineEl.setAttribute("id", cuisineArr[i]);
    cuisineEl.textContent = cuisineArr[i];
    cuisineDropdown.append(cuisineEl);
  }
}

// takes fetched data
// loops through data to pull out cuisine types [no duplicates]
function createCuisineArr(data) {
  let length = data.results.data.length;
  let cuisineArr = [];

  for (let i = 0; i < length; i++) {
    let apiCuisineLength = Object.keys(data.results.data[i].cuisine).length;
    for (let j = 0; j < apiCuisineLength; j++) {
      if (!cuisineArr.includes(data.results.data[i].cuisine[j].name)) {
        cuisineArr.push(data.results.data[i].cuisine[j].name);
      }
    }
  }
  return cuisineArr;
}

function handlePriceChange(event) {
  restaurantCard.innerHTML = "";

  let price = event.target.value;
  let filteredCuisineRestaurants = filteredRestaurants.filter(function (el) {
    return el.price_level === price;
  });
  filteredCuisineRestaurants.forEach((restaurant, index) => {
    if (index < 10) {
      let pTag = document.createElement("p");
      pTag.setAttribute("class", "p-2");
      pTag.innerHTML = `<h2> ${restaurant.name} </h2>`;
      pTag.innerHTML += `<img class="" src="${restaurant.photo.images.original.url}">`;
      pTag.innerHTML += `<h3> ${restaurant.cuisine[0].name}`;
      pTag.innerHTML += `<h4> ${restaurant.price_level}`;
      pTag.innerHTML += `<h5> ${restaurant.rating}`;
      pTag.innerHTML += `<h6> ${restaurant.address}`;
      pTag.innerHTML += `<h6> ${restaurant.phone}`;
      restaurantCard.append(pTag);
    }
  });
}

function handleCuisineChange(event) {
  restaurantCard.innerHTML = "";
  let cuisine = event.target.value;
  filteredRestaurants = restaurants.filter(function (el) {
    let isCuisine = false;
    for (let i = 0; i < el.cuisine.length; i++) {
      if (el.cuisine[i].name.toLowerCase() === cuisine.toLowerCase()) {
        isCuisine = true;
      }
    }
    return isCuisine;
  });
  console.log(filteredRestaurants);
  filteredRestaurants.forEach((restaurant, index) => {
    if (index < 10) {
      let pTag = document.createElement("p");
      pTag.setAttribute("class", "p-2");
      pTag.innerHTML = `<h2> ${restaurant.name} </h2>`;
      pTag.innerHTML += `<img class="" src="${restaurant.photo.images.original.url}">`;
      pTag.innerHTML += `<h3> ${restaurant.cuisine[0].name}`;
      pTag.innerHTML += `<h4> ${restaurant.price_level}`;
      pTag.innerHTML += `<h5> ${restaurant.rating}`;
      pTag.innerHTML += `<h6> ${restaurant.address}`;
      pTag.innerHTML += `<h6> ${restaurant.phone}`;
      restaurantCard.append(pTag);
    }
  });
}

//event listeners
// init();

searchForm.addEventListener("submit", handleFormSubmit);
priceDropdown.addEventListener("change", handlePriceChange);
cuisineDropdown.addEventListener("change", handleCuisineChange);
