let storage = localStorage;
let myCountry = JSON.parse(localStorage.getItem('mycountry'));


let nativeName = Object.entries(myCountry.name.nativeName);
let currencies = Object.entries(myCountry.currencies);

let html = `
        <div class="back">
            <button>&lt; Back</button>
        </div>
        <div class="content">
            <div class="flag">
                <img src="${myCountry.flags.png}" alt="Flag">
            </div>
            <div class="info">
                <h1>${myCountry.name.common}</h1>
                <div class="information">
                    <div>
                        <ul class="material">
                            <li><span>Native language : </span>${nativeName[0][1].official}</li>
                            <li><span>Population : </span>${populationDisplay(myCountry)}</li>
                            <li><span>Region : </span>${myCountry.region}</li>
                            <li><span>Sub Region : </span>${myCountry.subregion}</li>
                            <li><span>Capital : </span>${myCountry.capital[0]}</li>
                            
                        </ul>
                    </div>
                    <div>
                        <ul class="material">
                            <li><span>Languages : </span>${languageFormat(myCountry)}</li>
                            <li><span>Time Zone : </span>${myCountry.timezones[0]}</li>
                            <li><span>Currencies : </span>${currencies[0][1].name}</li>
                            <li><span>UN Member : </span>${myCountry.unMember}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>`

let main = document.querySelector('main');
main.insertAdjacentHTML('afterbegin',html);

// darkmode checking

let children = document.body.children;
if (JSON.parse(storage.getItem('val')) === 0){
    document.querySelector('.back button').classList.remove('blue');
    document.querySelector('.back button').style.background = "white";
    Array.from(children).forEach((val)=>{
      val.classList.remove('white');
    })
}else{
    document.querySelector('body').classList.add('blue');
    document.querySelector('.back button').style.background = "#2b343c";
    document.querySelector('.back button').style.color = "white";
    Array.from(children).forEach((val)=>{
        val.classList.add('white');
    })
}

// Dark Mode
let darkMode = document.querySelector("#DarkLight");

darkMode.addEventListener('click',()=>{
  if (JSON.parse(storage.getItem('val')) === 1){
    storage.setItem('val',JSON.stringify(0))
    document.querySelector('.back button').style.background = "white";
    document.querySelector('.back button').style.color = "black";
    document.querySelector('body').classList.remove('blue');
    Array.from(children).forEach((val)=>{
      val.classList.remove('white');
    })
}else{
    storage.setItem('val',JSON.stringify(1))
    document.querySelector('body').classList.add('blue');
    document.querySelector('.back button').style.background = "#2b343c";
    document.querySelector('.back button').style.color = "white";
    Array.from(children).forEach((val)=>{
      val.classList.add('white');
    })
  }
})

// Back Button
let backBtn = document.querySelector('.back button');
backBtn.addEventListener('click',()=>{
    location.href="../index.html";
})

//Population display function
function populationDisplay(array){
  let population = String(array.population);
  let len = population.length;
  let count = 0;
  let newString = '';
  for (let i = len - 1; i > -1; i--){
    if (count % 3 == 0){
      newString += ',';
    }
    newString += population[i];
    count++;
  }
  let newlen = newString.length;
  population = '';
  for (let i = newlen - 1; i  > 0; i--){
    population += newString[i];
  }
  return population;
}

//Language 
function languageFormat(array) {
  let language = Object.entries(array.languages);
  console.log(language);
  let langFormat = '';
  let len = language.length;
  for (let i = 0; i < len; i++){
    if (i === len - 1){
      langFormat += language[i][1];
    }
    else {
      langFormat += `${language[i][1]}, ` ;
    }
  }
  return langFormat;
}
