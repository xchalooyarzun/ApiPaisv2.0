const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsDiv = document.getElementById('results');
const searchCountDiv = document.getElementById('searchCount');
const searchHistoryDiv = document.getElementById('searchHistory');

const searchHistory = [];

function displayCountry(country) {
  const countryCard = document.createElement('div');
  countryCard.className = 'country-card';

  const countryImage = document.createElement('img');
  countryImage.src = country.flags.png;
  countryCard.appendChild(countryImage);

  const countryName = document.createElement('p');
  countryName.textContent = country.name.common;
  countryCard.appendChild(countryName);

  const detailsButton = document.createElement('button');
  detailsButton.textContent = 'Mas Detalles';
  detailsButton.addEventListener('click', () => {
    // You can customize what information to show here
    alert(`Pais: ${country.name.common}\nCapital: ${country.capital}`);
  });
  countryCard.appendChild(detailsButton);

  resultsDiv.appendChild(countryCard);
}

function searchCountries(query) {
  fetch(`https://restcountries.com/v3.1/name/${query}`)
    .then(response => response.json())
    .then(data => {
      searchCountDiv.textContent = `Resultado de Busqueda: ${data.length}`;
      resultsDiv.innerHTML = '';

      data.forEach(country => {
        displayCountry(country);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query !== '') {
    searchCountries(query);
    searchHistory.push(query);
    searchHistoryDiv.textContent = `Historial: ${searchHistory.join(', ')}`;
  }
});



searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();

  if (searchTerm !== '') {
    searchCountry(searchTerm);
  }
});

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchButton.click();
  }
});

function searchCountry(term) {
  fetch(`https://restcountries.com/v3.1/name/${term}`)
    .then(response => response.json())
    .then(data => {
      updateResults(data);
      updateHistory(term);
    })
    .catch(error => console.error(error));
}

function updateResults(data) {
  resultsList.innerHTML = '';
  resultCount.textContent = data.length;

  data.forEach(country => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <img src="${country.flags[0]}" alt="${country.name.common}">
      <span>${country.name.common}</span>
      <button class="detailsButton">Mas Informacion</button>
    `;
    listItem.querySelector('.detailsButton').addEventListener('click', () => {
      showDetails(country);
    });
    resultsList.appendChild(listItem);
  });
}

function showDetails(country) {
  // Customize the information you want to display in the details view
  alert(`Pais: ${country.name.common}\nCapital: ${country.capital}\nPoblacion: ${country.population}`);
}

function updateHistory(term) {
  if (!searchHistory.includes(term)) {
    searchHistory.push(term);
    const historyItem = document.createElement('li');
    historyItem.textContent = term;
    historyItem.addEventListener('click', () => {
      searchInput.value = term;
      searchCountry(term);
    });
    historyList.appendChild(historyItem);
  }
}
