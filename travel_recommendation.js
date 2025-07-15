const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');

function clearSearch(){
    document.getElementById('results').innerHTML = "";
    document.getElementById('keywordInput').value ="";
}

function getResults(){
    const input = document.getElementById('keywordInput').value.toLowerCase();
    let results = [];

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (input === 'beach' || input === 'beaches') {
                data.beaches.forEach(beach => {
                    results.push(beach);
                });
            } else if (input === 'country' || input === 'countries') {
                data.countries.forEach(country => {
                    country.cities.forEach(city => {
                        results.push(city);
                    })
                })
            } else if (input === 'temple' || input === 'temples'){
                data.temples.forEach(temple => {
                    results.push(temple);
                })
            }
            console.log(results);
            displayResults(results)
        })
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (results.length === 0) {
        const item = document.createElement('div');
        item.classList.add('result-item');
        item.innerHTML = `
            <h2>No results found.</h2>
            <img src="crying.jpg" alt="sad">
        `;
        resultsDiv.appendChild(item);
        return;
    }
    /* if there are more than two things to print, randomly select two of them */
    if (results.length > 2) {
        let temp = [];
      
        // Pick first random item and remove it from results
        let i = Math.floor(Math.random() * results.length);
        temp.push(results[i]);
        results.splice(i, 1); // Remove it from the original array
      
        // Pick second random item from remaining items
        let j = Math.floor(Math.random() * results.length);
        temp.push(results[j]);
      
        // Replace original results with the two selected
        results = temp;
      }

    results.forEach(result => {
        const item = document.createElement('div');
        item.classList.add('result-item');
        item.innerHTML = `
            <h2>${result.name}</h2>
            <img src="${result.imageUrl}" alt="${result.name}">
            <p>${result.description}</p>
            <a href=\"${result.imageUrl}\"><button>Visit</button></a>
        `;
        resultsDiv.appendChild(item);
        console.log(result.imageUrl);
    });
}

btnSearch.addEventListener('click', getResults);
btnReset.addEventListener('click', clearSearch);