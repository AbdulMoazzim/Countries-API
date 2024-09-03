let cards = `<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`;

let main = document.querySelector('.countries');

let api = fetch(' https://restcountries.com/v3.1/all');

api.then(response => response.json())
.then((response)=>{
    console.log(response);
    let length = response.length;
    for (let i = 0; i < length; i++){
        main.insertAdjacentHTML('afterbegin',`<div class="card" style="width: 18rem;">
  <img src="${response[i].flags.png}" alt="countries">
  <div class="card-body">
    <h5 class="card-title">${response[i].name.common}</h5>
    <ul>
      <li><span>Population:</span>${response[i].population}</li>
      <li><span>Region:</span>${response[i].region}</li>
      <li><span>Capital:</span>${response[i].capital}</li>
    </ul
  </div>
</div>`)
    }
})