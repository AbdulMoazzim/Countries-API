let cards = `<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`;

let cardBody;
let main = document.querySelector(".countries");
let region = document.querySelector("#region");
let filterArray = [];
let selectedArray = [];
let search = document.querySelector("#search");
let api = fetch(" https://restcountries.com/v3.1/all");

api
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
    let length = response.length;
    for (let i = 0; i < length; i++) {
      main.insertAdjacentHTML(
        "afterbegin",
        `<div class="card" style="width: 18rem;">
  <img src="${response[i].flags.png}" alt="countries">
  <div class="card-body">
    <h5 class="card-title">${response[i].name.common}</h5>
    <ul>
      <li><span>Population:</span>${response[i].population}</li>
      <li><span>Region:</span>${response[i].region}</li>
      <li><span>Capital:</span>${response[i].capital}</li>
    </ul
  </div>
</div>`
      );
    }
    
    cardBody = document.body.querySelectorAll('.card-body');
    search.addEventListener("input", (event) => {
      if (region.value === "" && search.value === "") { 
        displayFilteredCountries(response);
      }
      else{   
        newArray = [];
        if (region.value === "") {
          for (let i = 0; i < length; i++) {
            if (response[i].name.common.toLowerCase().includes(event.target.value)) 
              {
              newArray.push(response[i]);
            }
          }
          displayFilteredCountries(newArray);
        } else {
          for (let i = 0; i < selectedArray.length; i++) {
            if (selectedArray[i].name.common.toLowerCase().includes(event.target.value)) {
              newArray.push(selectedArray[i]);
            }
          }
          displayFilteredCountries(newArray);
        }
        cardBody = document.body.querySelectorAll('.card-body');
      }
    });


    region.addEventListener("change", () => {
      if (region.value === "" && search.value === "") { 
        displayFilteredCountries(response);
      }else{
        selectedArray = [];
        for (let i = 0; i < length; i++) {
          if (region.value === response[i].continents[0]) {
            selectedArray.push(response[i]);
          }
        }
        displayFilteredCountries(selectedArray);
      }
      cardBody = document.body.querySelectorAll('.card-body');
    });
  });

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
  <li><span>Population:</span>${array[i].population}</li>
  <li><span>Region:</span>${array[i].region}</li>
  <li><span>Capital:</span>${array[i].capital}</li>
</ul
</div>
</div>`
    );
  }
}

// Dark Mode
let children = document.body.children;
let darkMode = document.querySelector("#DarkLight");

darkMode.addEventListener('click',()=>{
  document.querySelector('body').classList.toggle('blue');
  search.classList.toggle('blue');
  region.classList.toggle('blue');
  region.classList.toggle('white');
  region.classList.toggle('border-white');
  
  Array.from(children).forEach((val)=>{
    val.classList.toggle('white');
  })
  Array.from(cardBody).forEach((val)=>{
    val.classList.toggle('white');
    val.classList.toggle('blue');
  })
})
