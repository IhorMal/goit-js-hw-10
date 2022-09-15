const SETTINGS = 'fields=name,capital,population,flags,languages';

export default function (nameCantri) {
   return fetch(`https://restcountries.com/v2/name/${nameCantri}?${SETTINGS}`).then(response => {
        return response.json();
    }).then(data => {
        return data;
})};
