let cards = `<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`;

let cardBody;
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
    

    //Input Search
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
        checkingModeForCards(cardBody);
        countryInfo(cardBody,newArray.length, newArray);
      }
    });

    //Region search
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
      checkingModeForCards(cardBody);
      countryInfo(cardBody,selectedArray.length, selectedArray);

    });

    // darkmode checking
    if (JSON.parse(storage.getItem('val')) === 0){
      document.querySelector('body').classList.remove('blue');
      search.classList.remove('blue');
      region.classList.remove('blue');
      region.classList.remove('white');
      region.classList.remove('border-white');
      
      Array.from(children).forEach((val)=>{
        val.classList.remove('white');
      })
      Array.from(cardBody).forEach((val)=>{
        val.classList.add('white');
        val.classList.add('blue');
      })
      
    }else{
      document.querySelector('body').classList.add('blue');
      search.classList.add('blue');
      region.classList.add('blue');
      region.classList.add('white');
      region.classList.add('border-white');
      
      Array.from(children).forEach((val)=>{
        val.classList.add('white');
      })
      Array.from(cardBody).forEach((val)=>{
        val.classList.add('white');
        val.classList.add('blue');
      })
      countryInfo(cardBody,length,response);
}
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
  <li><span>Population:</span>${array[i].population}</li>
  <li><span>Region:</span>${array[i].region}</li>
  <li><span>Capital:</span>${array[i].capital}</li>
</ul
</div>
</div>`
    );
  }
}

//Storing country info
function countryInfo(cardBody,length,array){
  cardBody.forEach((val)=>{
    val.addEventListener('click',()=>{
      for (let i = 0; i < length; i++) {
        if (array[i].name.common === val.children[0].innerText) {
          storage.setItem('mycountry',JSON.stringify(array[i]));
          location.href="displaypage.html";
        }
      }
    })
  })
}


// card mode display
function checkingModeForCards(){
  if (JSON.parse(storage.getItem('val')) === 0){
    Array.from(cardBody).forEach((val)=>{
      val.classList.remove('white');
      val.classList.remove('blue');
    })
  } else {
    Array.from(cardBody).forEach((val)=>{
      val.classList.add('white');
      val.classList.add('blue');
    })
  }
}

// Dark Mode
let children = document.body.children;
let darkMode = document.querySelector("#DarkLight");

darkMode.addEventListener('click',()=>{
  if (JSON.parse(storage.getItem('val')) === 1){
    storage.setItem('val',JSON.stringify(0))
    document.querySelector('body').classList.remove('blue');
    search.classList.remove('blue');
    region.classList.remove('blue');
    region.classList.remove('white');
    region.classList.remove('border-white');
    
    Array.from(children).forEach((val)=>{
      val.classList.remove('white');
    })
    Array.from(cardBody).forEach((val)=>{
      val.classList.remove('white');
      val.classList.remove('blue');
    })
  }else{
    storage.setItem('val',JSON.stringify(1))
    document.querySelector('body').classList.add('blue');
    search.classList.add('blue');
    region.classList.add('blue');
    region.classList.add('white');
    region.classList.add('border-white');
    
    Array.from(children).forEach((val)=>{
      val.classList.add('white');
    })
    Array.from(cardBody).forEach((val)=>{
      val.classList.add('white');
      val.classList.add('blue');
    })
  }
})
