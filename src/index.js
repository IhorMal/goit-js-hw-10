import 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './js/fetchCountries'
import './css/styles.css';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const ref = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}
const { input, countryList, countryInfo } = ref;

input.addEventListener('input', debounce(onVeleuInput, DEBOUNCE_DELAY));

function onVeleuInput(e) {
   let value = e.target.value.trim();
    if (value === '') {
        return;
    } 
    fetchCountries(value).then(res => {
        
        if (res.status === 404) {
            Notiflix.Notify.warning("Oops, there is no country with that name");
            return;
        }else if (res.length > 10) {
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            return;
        };

        cliarHtml()
        if (res.length >= 2 && res.length <= 10) {
            onAbbreviatedListCountries(res);
        }else if (res.length === 1) {
            detailedInformationCountry(res);
        };
}); 
};

function onAbbreviatedListCountries(params) {

  let cantri = params.map(({ flags, name }) => {
      return `<li class="country-list_item">
      <img class="country-list_item-img" src="${flags.svg}" alt="прапор">
      <span>${name}</span>
      </li>
      `
  }).join(' ');
    
    countryList.insertAdjacentHTML('afterbegin', cantri);
}

function detailedInformationCountry(country) {

    let cantris = country.map(({name, capital, population, flags, languages }) => {
        return `<div class="country-info_conteiner">
            <div class="conteiner">
            <img class="country-info_img" src="${flags.svg}" alt="Прапор">
            <p>${name}</p>
            </div>
            <ul class="country-info_list">
            <li class="country-info_list-item">Capital - <span>${capital}</span></li>
            <li class="country-info_list-item">Population - <span>${population}</span></li>
            <li class="country-info_list-item">Languages - <span> ${Object.values(languages[0]).join(', ')};</span></li>
            </ul>
        </div>`
    });

    countryInfo.insertAdjacentHTML('afterbegin', cantris);
};

function cliarHtml() {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
}