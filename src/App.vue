<template>
  <main class="bg-gradient-to-br overflow-hidden from-frangipani-200 to-frangipani-400 min-h-screen">
    <div class="navbar bg-transparent text-tuna-900">
      <div class="flex-1 navbar-start">
        <a class="btn btn-ghost text-xl">July Forecast</a>
      </div>
      <div class="flex-none navbar-center gap-2 sm:focus-within:translate-x-12">
        <form action="" class="relative  mx-auto w-max" @submit.prevent="getWeather">
          <input type="search" v-model="city"
            class="peer cursor-pointer focus relative z-10 h-12 w-12 rounded-full border-frangipani-500 border bg-transparent pl-12 outline-none transition-all duration-300 ease-in-out focus:w-full focus:cursor-text focus:border-frangipani-600 focus:pl-16 focus:pr-4 sm:focus:w-[60%]" />
          <img :src="searchIcon"
            class="absolute inset-y-0 my-auto scale-105 border-r border-transparent px-3.5 transition-all duration-300 ease-in-out peer-focus:border-frangipani-600 peer-focus:stroke-frangipani-600"
            alt="search icon">
        </form>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center mt-20" v-if="!weatherData">
      <h1 class="text-3xl text-tuna-900 font-bold sm:text-center">
        Welcome To July Weather App! </h1>
      <h1 class="text-2xl mt-3 text-tuna-900">
        Please Search For a City..
      </h1>
    </div>
    <div v-if="weatherData" class="text-tuna-900 mt-8 mx-5 flex items-center flex-col ">
      <h2 class="text-4xl font-bold text-left sm:text-center">
        {{ weatherData.name }}, {{ weatherData.sys.country }}
      </h2>
      <p class="text-tuna-500 my-5 mt-3 text-left">
        {{ formattedDay }}, {{ formattedDate }}
      </p>
      <div class="flex flex-row items-center sm:flex-col justify-center">
        <img :src="getWeatherIconUrl(weatherData.weather[0].main)" class="w-64" alt="weather-image">
        <div class="flex flex-col">
          <h3 class="text-5xl font-bold">
            {{ Math.round(weatherData.main.temp) + "°C" }}
          </h3>
          <h3 class="text-5xl font-bold mt-4">
            {{ weatherData.weather[0].main }}

          </h3>
        </div>
      </div>
      <div class="flex items-center justify-center flex-col mb-12 sm:mt-12 gap-5 w-full">
        <div
          class="w-[50%] sm:w-[90%] h-16 flex items-center justify-between px-5 bg-white bg-opacity-30 rounded-lg shadow-md">
          <div class="flex items-center">
            <img :src="pressureIcon" class="w-20 scale-105 h-auto mt-3" alt="Pressure Icon">
            <p class="text-gray-700">Pressure</p>
          </div>
          <p class="text-gray-700">{{ weatherData.main.pressure }} hPa</p>
        </div>
        <div
          class="w-[50%] sm:w-[90%] h-16 flex items-center justify-between px-5 bg-white bg-opacity-30 rounded-lg shadow-md">
          <div class="flex items-center">
            <img :src="windIcon" class="w-20 scale-110 mt-2 h-auto" alt="Wind Icon">
            <p class="text-gray-700">Wind</p>
          </div>
          <p class="text-gray-700">{{ weatherData.wind.speed }} km/h</p>
        </div>
        <div
          class="w-[50%] sm:w-[90%] h-16 flex items-center justify-between px-5 bg-white bg-opacity-30 rounded-lg shadow-md">
          <div class="flex items-center">
            <img :src="humidityIcon" class="w-20 h-auto mt-8" alt="Humidity Icon">
            <p class="text-gray-700">Humidity</p>
          </div>
          <p class="text-gray-700">{{ weatherData.main.humidity }} %</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import searchIcon from './assets/search.png';
import pressureIcon from './assets/pressure.png';
import windIcon from './assets/wind-icon.png';
import humidityIcon from './assets/humidity-icon.png';
import cloudyIcon from './assets/cloudy.png';
import sunnyIcon from './assets/sunny.png';
import rainyIcon from './assets/rainy.png';
import snowIcon from './assets/snow.png';
import fogIcon from './assets/fog.png';

export default {
  data() {
    return {
      city: '',
      apiKey: "2fed6d98bf73e97f21376b5585c07da1",
      apiUrl: "https://api.openweathermap.org/data/2.5/weather?units=metric&q=",
      weatherData: null,
      searchIcon,
      pressureIcon,
      windIcon,
      humidityIcon,
    };
  },
  methods: {
    getWeatherIconUrl(weatherCondition) {
      switch (weatherCondition) {
        case 'Clouds':
          return cloudyIcon;
        case 'Clear':
          return sunnyIcon;
        case 'Rain':
          return rainyIcon;
        case 'Drizzle':
          return rainyIcon;
        case 'Snow':
          return snowIcon
        case 'Fog':
          return fogIcon
      }
    },
    async getWeather() {
      if (!this.city) {
        console.error('City name cannot be empty');
        return;
      }

      try {
        const response = await axios.get(this.apiUrl + this.city + `&appid=${this.apiKey}`);
        this.weatherData = response.data;
        console.log(this.weatherData);
      } catch (error) {
        if (error.response) {
          console.error(`Error: ${error.response.status} - ${error.response.data.message}`);
        } else {
          console.error('Error:', error.message);
        }
      }
    },
  },
  computed: {
    formattedDay() {
      if (this.weatherData) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const timestamp = this.weatherData.dt * 1000; // Convert to milliseconds
        const dateObject = new Date(timestamp);
        const dayIndex = dateObject.getDay();
        return days[dayIndex];
      }
      return '';
    },
    formattedDate() {
      if (this.weatherData) {
        const timestamp = this.weatherData.dt * 1000; // Convert to milliseconds
        const dateObject = new Date(timestamp);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return dateObject.toLocaleDateString('en-US', options);
      }
      return '';
    },
  },
}
</script>