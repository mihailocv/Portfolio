const time = document.querySelector("#time");
const date = document.querySelector("#date");
const temp = document.querySelector("#temp");
const apiKey = import.meta.env.VITE_API_KEY;

function setTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  m = formatClock(m);

  time.innerHTML = h + ":" + m;
  setTimeout(setTime, 1000);
}

function formatClock(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function setDate() {
  let currentDate = new Date();
  date.innerHTML = `${currentDate.getDate()} . ${
    currentDate.getMonth() + 1
  } . 1988`;
  setTimeout(setTime, 60000);
}

function setTemp() {
  if (!apiKey) {
    console.error("API key is missing");
  } else {
    console.log("API key loaded successfully");
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=3194360&units=metric&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then(displayData)
      .catch((error) => console.log("Greska sa vremenom: ", error));
  }
}

const displayData = (weather) => {
  temp.innerHTML = `${Math.round(weather.main.temp)}&degC`;
};

setTime();
setDate();
setTemp();
