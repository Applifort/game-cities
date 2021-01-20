const CITIES = ['москва', 'санкт-петербург', 'смоленск', 'алушта', 'геленджик', 'курск', 'казань', 'нижний', 'архангельск']
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
    player: players.user,
    state: 'playing',
    usedCities: [getDefaultCity(CITIES)],
  };

  const getLastCity = (cities) => cities.slice(-1)[0];
  
  const getAvailableCities = () => {
    const lastCity = getLastCity(state.usedCities);
    return CITIES.filter((city) => !state.usedCities.includes(city) && getLastLetter(lastCity) === city.charAt(0));
  };

  const makeComputerStep = () => {
    if (state.state == 'finish') return;
  
    state.player = players.user;
    const availableCities = getAvailableCities();
  
    if (isEmpty(availableCities)) {
      state.state = 'finish';
      return;
    }
  
    const city = availableCities[getRandomNumberFromZeroTo(availableCities.length - 1)];
    state.usedCities = [...state.usedCities, city];
  };
  
  const makeUserStep = (city) => {
    const availableCities = getAvailableCities();
  
    if (isEmpty(availableCities) && !availableCities.includes(city)) {
      state.state = 'finish';
      state.player = players.computer;
      return;
    }

    state.usedCities.push(city);
    state.player = players.computer;
  };
  
  const render = () => {
    if (state.state == 'finish') {
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

  const handleEvent = () => {
    const input = document.getElementById('input');
    const userInput = input.value.toLowerCase();
    input.value = '';
  
    if (state.player === players.user) makeUserStep(userInput);
    if (state.player === players.computer) makeComputerStep();
    render();
  };

  citySendButton.addEventListener('click', handleEvent);
  render();
};

App();
