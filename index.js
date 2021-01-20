const cities = ['москва', 'санкт-петербург', 'смоленск', 'алушта', 'геленджик', 'курск', 'казань', 'нижний', 'архангельск']

const players = {
  computer: 'Computer',
  user: 'User', 
};

const forbiddenLetters = ['ъ', 'ь' ,'ы'];

const getRandomNumberFromZeroTo = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const getLastLetter = (city) => {
  const reversedCityName =  city.split('').reverse().join('');
  const lastLetter = reversedCityName.charAt(0);

  if (forbiddenLetters.includes(lastLetter)) {
    return reversedCityName.charAt(1);
  }
  return lastLetter;
};

const isEmpty = (elements) => {
  return elements.length === 0;
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const App = () => {
  const gameState = {
    player: players.user,
    state: 'start',
    currentCity: 'Москва',
    userAttempts: 1,
    usedCities: ['Mосква'],
  };
  
  const getAvailableCities = () => {
    return cities.filter((city) => !gameState.usedCities.includes(city) && getLastLetter(gameState.currentCity) === city.charAt(0));
  };
  
  const makeComputerStep = () => {
    if (gameState.state == 'finish') return;
  
    gameState.player = players.user;
  
    const availableCities = getAvailableCities();
  
    if (isEmpty(availableCities)) {
      gameState.state = 'finish';
      return;
    }
  
    const city = availableCities[getRandomNumberFromZeroTo(availableCities.length - 1)];
    gameState.usedCities.push(city);
    gameState.currentCity = city;
  };
  
  const makeUserStep = (city) => {
    const availableCities = getAvailableCities();
  
    if (isEmpty(availableCities) || gameState.userAttempts > 2) {
      gameState.state = 'finish';
      gameState.player = players.computer;
      return;
    }
  
    if (availableCities.includes(city)) {
      gameState.usedCities.push(city);
      gameState.currentCity = city;
      gameState.player = players.computer;
      gameState.userAttempts = 1;
    } else {
      gameState.userAttempts += 1;
    }
  };
  
  const render = () => {
    if (gameState.state == 'finish') {
      const container = document.querySelector(".container");;
      container.innerHTML = '';
      const h2 = document.createElement('h2');
      h2.innerText = `Игра окончена, победитель ${gameState.player}`;
      container.appendChild(h2);
      return;
    }
  
    const citiesElement = document.getElementById('cities');
    const ulElement = document.createElement('ul');
    gameState.usedCities.forEach((city) => {
      const li = document.createElement('li');
      li.textContent = capitalizeFirstLetter(city);
      ulElement.appendChild(li);
    })
    citiesElement.innerHTML = '';
    citiesElement.appendChild(ulElement);
  
    const currentCity = document.getElementById('city')
    currentCity.textContent = capitalizeFirstLetter(gameState.currentCity);
  };
  
  const button = document.getElementById('button');

  const handleEvent = () => {
    const input = document.getElementById('input');
    const userInput = input.value.toLowerCase();
    input.value = '';
  
    if (gameState.player === players.user) {
      makeUserStep(userInput);
    }
  
    if (gameState.player === players.computer) {
      makeComputerStep();
    }
  
    render();
  };

  button.addEventListener('click', handleEvent);
  render();
};

App();
