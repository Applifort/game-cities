const CITIES = ['москва', 'санкт-петербург', 'смоленск', 'алушта', 'геленджик', 'курск', 'казань', 'нижний', 'архангельск', 'йошкар-ола']
const EXCEPTED_LETTERS = ['ъ', 'ь' ,'ы'];

const players = {
  computer: 'Computer',
  user: 'User', 
};

const getRandomNumberFromZeroTo = (max) => Math.floor(Math.random() * Math.floor(max));

const getLastLetter = (city) => {
  const reversedCityName =  city.split('').reverse().join('');
  const lastLetter = reversedCityName.charAt(0);
  if (EXCEPTED_LETTERS.includes(lastLetter)) {
    return reversedCityName.charAt(1);
  }
  return lastLetter;
};

const isEmpty = (elements) => elements.length === 0;
const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
const getDefaultCity = (cities) => cities[getRandomNumberFromZeroTo(cities.length - 1)];

const App = () => {
  const state = {
    player: players.computer,
    state: 'playing',
    usedCities: [getDefaultCity(CITIES)],
  };

  const getLastCity = (cities) => cities.slice(-1)[0];
  
  const getAvailableCities = (usedCities, cities) => {
    const lastCity = getLastCity(usedCities);
    return cities.filter((city) => !usedCities.includes(city) && getLastLetter(lastCity) === city.charAt(0));
  };

  const getRandomAvailableCity = (cities) => {
    if (isEmpty(cities)) return '';
    return cities[getRandomNumberFromZeroTo(cities.length - 1)];
  };

  const isGameFinished = () => state.state === 'finish';
  const isGamePlaying = () => state.state === 'playing';
  const isUser = (player) => player === players.user;

  const togglePlayer = () => {
    const currentPlayer = state.player;
    const nextPlayer = isUser(currentPlayer) ? players.computer : players.user;
    state.player = nextPlayer;
  };

  const makeStep = (city) => {
    const cities = getAvailableCities(state.usedCities, CITIES);

    if (city === '' || !cities.includes(city)) {
      state.state = 'finish';
      return;
    }
  
    state.usedCities = [...state.usedCities, city];
    togglePlayer();
  };
  
  const render = () => {
    if (isGameFinished()) {
      alert(`Игра окончена, победитель ${state.player}`);
      return;
    }

    const citiesList = document.getElementById('cities');
    citiesList.innerHTML = '';
    state.usedCities.forEach((city) => {
      const cityItem = document.createElement('li');
      cityItem.textContent = capitalizeFirstLetter(city);
      citiesList.appendChild(cityItem);
    })

    const currentCity = document.getElementById('city')
    const lastCity = getLastCity(state.usedCities);
    currentCity.textContent = capitalizeFirstLetter(lastCity);
  };

  const citySendButton = document.getElementById('button');
  const input = document.getElementById('input');

  const handleInsertCity = () => {
    const userCity = input.value.toLowerCase();
    input.value = '';
  
    makeStep(userCity);
    if (isGamePlaying()) {
      const availableCities = getAvailableCities(state.usedCities, CITIES);
      const computerCity = getRandomAvailableCity(availableCities);
      makeStep(computerCity);
    }
    
    render();
  };

  citySendButton.addEventListener('click', handleInsertCity);
  render();
};

App();
