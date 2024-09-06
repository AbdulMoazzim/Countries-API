let storage = localStorage;
let myCountry = JSON.parse(localStorage.getItem('mycountry'));


let nativeName = Object.entries(myCountry.name.nativeName);
let currencies = Object.entries(myCountry.currencies);
let language = Object.entries(myCountry.languages);

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
                            <li><span>Popilation : </span>${myCountry.population}</li>
                            <li><span>Region : </span>${myCountry.region}</li>
                            <li><span>Sub Region : </span>${myCountry.subregion}</li>
                            <li><span>Capital : </span>${myCountry.capital[0]}</li>
                            
                        </ul>
                    </div>
                    <div>
                        <ul class="material">
                            <li><span>Time Zone : </span>${myCountry.timezones[0]}</li>
                            <li><span>Currencies : </span>${currencies[0][1].name}</li>
                            <li><span>Languages : </span>${language[0][1]}</li>
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
console.log(myCountry)