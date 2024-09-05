let storage = localStorage;

let myCountry = JSON.parse(localStorage.getItem('mycountry'));

document.querySelector('#flag').src = myCountry.flags.png;

