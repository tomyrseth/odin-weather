import './styles.css';

const form = document.getElementById('form');
const location = document.getElementById('location');
const temp = document.getElementById('temp');
const conditions = document.getElementById('conditions');
const loading = document.getElementById('loading');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const location = formData.get('location');
  startLoading();
  getWeather(location);
});

async function getWeather(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=metric&key=5ZLPE4LJ9ANJY7A5M3GW827L6&contentType=json`
    );
    stopLoading();
    const data = await response.json();
    display(data);
  } catch (err) {
    alert('Failed, make sure you type in a location.');
    alert(err);
  }
}

function display(data) {
  location.innerText = data.resolvedAddress;
  temp.innerText = data.currentConditions.temp + '°C';
  conditions.innerText = data.currentConditions.conditions;
}

function startLoading() {
  loading.innerText = 'Loading...';
}

function stopLoading() {
  loading.innerText = '...';
}

getWeather('Oslo');
