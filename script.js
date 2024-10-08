let cardBody;
let card;
let storage = localStorage;
let main = document.querySelector(".countries");
let region = document.querySelector("#region");
let filterArray = [];
let selectedArray = [];
let search = document.querySelector("#search");

// Fetching API
let api = fetch(" https://restcountries.com/v3.1/all");

// Displaying cards from response
api
  .then((response) => response.json())
  .then((response) => {
    let length = response.length;
    displayFilteredCountries(response);

    cardBody = document.body.querySelectorAll(".card-body");
    card = document.body.querySelectorAll(".card");

    // darkmode checking
    if (JSON.parse(storage.getItem("val")) === 0) {
      document.querySelector("body").classList.remove("blue");
      search.classList.remove("blue");
      region.classList.remove("blue");
      region.classList.remove("white");
      region.classList.remove("border-white");
      search.classList.remove("white");

      Array.from(children).forEach((val) => {
        val.classList.remove("white");
      });
      Array.from(cardBody).forEach((val) => {
        val.classList.remove("white");
        val.classList.remove("blue");
      });
      countryInfo(card, length, response);
    } else {
      document.querySelector("body").classList.add("blue");
      search.classList.add("blue");
      region.classList.add("blue");
      region.classList.add("white");
      region.classList.add("border-white");
      search.classList.add("white");

      Array.from(children).forEach((val) => {
        val.classList.add("white");
      });
      Array.from(cardBody).forEach((val) => {
        val.classList.add("white");
        val.classList.add("blue");
      });
      countryInfo(card, length, response);
    }

    //Input Search
    search.addEventListener("input", (event) => {
      if (region.value === "" && search.value === "") {
        displayFilteredCountries(response);
      } else {
        newArray = [];
        if (region.value === "") {
          for (let i = 0; i < length; i++) {
            if (
              response[i].name.common
                .toLowerCase()
                .includes(event.target.value.toLowerCase())
            ) {
              newArray.push(response[i]);
            }
          }
          displayFilteredCountries(newArray);
        } else {
          for (let i = 0; i < selectedArray.length; i++) {
            if (
              selectedArray[i].name.common
                .toLowerCase()
                .includes(event.target.value.toLowerCase())
            ) {
              newArray.push(selectedArray[i]);
            }
          }
          displayFilteredCountries(newArray);
        }
      }
      cardBody = document.body.querySelectorAll(".card-body");
      card = document.body.querySelectorAll(".card");
      checkingModeForCards(cardBody);
      countryInfo(card, newArray.length, newArray);
    });

    //Region search
    region.addEventListener("change", () => {
      if (region.value === "" && search.value === "") {
        displayFilteredCountries(response);
      } else {
        selectedArray = [];
        for (let i = 0; i < length; i++) {
          if (region.value === response[i].continents[0]) {
            selectedArray.push(response[i]);
          }
        }
        displayFilteredCountries(selectedArray);
      }
      cardBody = document.body.querySelectorAll(".card-body");
      card = document.body.querySelectorAll(".card");
      checkingModeForCards(cardBody);
      countryInfo(card, selectedArray.length, selectedArray);
    });
  });

// Display Function
function displayFilteredCountries(array) {
  if (array.length > 0) {
    main.innerHTML = "";
  } else {
    main.innerHTML = "<h1>No Such Countries!</h2>";
  }
  for (let i = 0; i < array.length; i++) {
    main.insertAdjacentHTML(
      "afterbegin",
      `<div class="card" style="width: 18rem;">
<img src="${array[i].flags.png}" alt="countries">
<div class="card-body">
<h5 class="card-title">${array[i].name.common}</h5>
<ul>
  <li><span>Population : </span>${populationDisplay(array[i])}</li>
  <li><span>Region : </span>${array[i].region}</li>
  <li><span>Capital : </span>${array[i].capital}</li>
</ul
</div>
</div>`
    );
  }
}

//Storing country info
function countryInfo(card, length, array) {
  card.forEach((val) => {
    val.addEventListener("click", () => {
      for (let i = 0; i < length; i++) {
        if (array[i].name.common === val.children[1].children[0].innerText) {
          storage.setItem("mycountry", JSON.stringify(array[i]));
          location.href = "DisplayPage/displaypage.html";
        }
      }
    });
  });
}

//Population display function
function populationDisplay(array) {
  let population = String(array.population);
  let len = population.length;
  let count = 0;
  let newString = "";
  for (let i = len - 1; i > -1; i--) {
    if (count % 3 == 0) {
      newString += ",";
    }
    newString += population[i];
    count++;
  }
  let newlen = newString.length;
  population = "";
  for (let i = newlen - 1; i > 0; i--) {
    population += newString[i];
  }
  return population;
}

// card mode display
function checkingModeForCards() {
  if (JSON.parse(storage.getItem("val")) === 0) {
    Array.from(cardBody).forEach((val) => {
      val.classList.remove("white");
      val.classList.remove("blue");
    });
  } else {
    Array.from(cardBody).forEach((val) => {
      val.classList.add("white");
      val.classList.add("blue");
    });
  }
}

// Dark Mode
let children = document.body.children;
let darkMode = document.querySelector("#DarkLight");

darkMode.addEventListener("click", () => {
  if (JSON.parse(storage.getItem("val")) === 1) {
    storage.setItem("val", JSON.stringify(0));
    document.querySelector("body").classList.remove("blue");
    search.classList.remove("blue");
    region.classList.remove("blue");
    region.classList.remove("white");
    search.classList.remove("white");
    region.classList.remove("border-white");

    Array.from(children).forEach((val) => {
      val.classList.remove("white");
    });
    Array.from(cardBody).forEach((val) => {
      val.classList.remove("white");
      val.classList.remove("blue");
    });
  } else {
    storage.setItem("val", JSON.stringify(1));
    document.querySelector("body").classList.add("blue");
    search.classList.add("blue");
    region.classList.add("blue");
    region.classList.add("white");
    search.classList.add("white");
    region.classList.add("border-white");

    Array.from(children).forEach((val) => {
      val.classList.add("white");
    });
    Array.from(cardBody).forEach((val) => {
      val.classList.add("white");
      val.classList.add("blue");
    });
  }
});
