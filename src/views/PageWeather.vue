<template>
  <div class="container">
    <Navigation />
    <div class="weather">
      <div class="weather__search-box">
        <input
          type="text"
          placeholder="Найти..."
          class="weather__search-input"
          v-model="searchCountry"
          v-on:keyup.enter="goSearch"
        />
      </div>
      <div v-if="isLoaded" class="weather__info">
        <div class="location">
          <p class="location__city">
            {{ searchCountry }}
          </p>
        </div>
        <div class="temperature">
          <p class="temperature__count">{{ temp }}°</p>
          <p class="temperature__type">{{ weatherType }}</p>
        </div>
        <div class="additionally">
          <p class="additionally__text-block">
            Ощущается как: {{ tempFeelLikes }}°
          </p>
          <p class="additionally__text-block">
            Скорость ветра: {{ wingSpeed }} м/c
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Navigation from "@/components/Navigation.vue";
import axios, { AxiosResponse } from "axios";

@Component({
  components: { Navigation },
})
export default class PageWeather extends Vue {
  /* eslint-disable */
  apiKey: NodeJS.Process = process.env.VUE_APP_WEATHER_API;
  url: NodeJS.Process = process.env.VUE_APP_WEATHER_URL;
  isLoaded: boolean = false;
  searchCountry: string = "";
  temp: number = 0;
  tempFeelLikes: number = 0;
  wingSpeed: number = 0;
  weatherType: string = "";
  weatherTypeRuTranslit:
    | { Clouds: string; Clear: string; Rain: string; Snow: string }
    | any = {
    Clouds: "Облачно",
    Clear: "Ясно",
    Rain: "Дождь",
    Snow: "Снег",
  };
  result: {} = {};

  /** Запрос к апи */
  getCallApi() {
    axios
      .get(
        `${this.url}weather?q=${this.searchCountry}&units=metric&appid=${this.apiKey}&lang=ru\``,
        {}
      )
      .then((response: AxiosResponse) => {
        this.result = response.data;
        this.temp = Math.round(response.data.main.temp);
        this.tempFeelLikes = Math.round(response.data.main.feels_like);
        this.wingSpeed = response.data.wind.speed;
        let weatherTypeEng = response.data.weather[0].main;
        this.weatherType = this.weatherTypeRuTranslit[weatherTypeEng];
      })

      .catch(() =>
        alert(
          "Данные не загрузились или отсутствуют, попробуйте перезагрузить страницу"
        )
      );
  }

  /** Поиск */
  goSearch(event: KeyboardEvent) {
    if (event.key === "Enter" && this.searchCountry) {
      this.getCallApi();
      this.isLoaded = true;
    }
  }
}
</script>

<style scoped lang="scss">
.weather {
  width: 50%;
  background: linear-gradient(#ead9fa, #9dd3e380);
  margin: 100px auto;
  padding: 30px;
  border-radius: 7px;

  &__search-box {
    text-align: center;
  }
  &__search-input {
    width: 60%;
    background-color: #faf7fc;
    padding: 20px 40px;
    border: none;
    border-radius: 10px 0 10px 0;
    outline: none;
  }
  &__search-input[type="text"] {
    font-size: 1.5rem;
    color: #634085;
  }
  &__search-input:focus,
  &__search-input:hover {
    border-radius: 10px 0 10px 0;
    box-shadow: 1px 3px 20px 1px #c39ee7;
  }
  &__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
.location {
  width: 60%;
  margin:40px auto 20px;
  background-color: #d6b5f5;
  border-radius: 7px;

  &__city {
    font-size: 2rem;
    color: #fff;
    text-align: center;
  }
}
.temperature {
  width: 60%;
  margin: auto 0 20px;
  padding: 30px 50px;
  background-color: rgba(157, 211, 227, 0.5);
  border-radius: 7px;
  &__count {
    font-size: 90px;
    font-weight: 900;
    text-align: center;
    color: #634085;
    text-shadow: 8px 6px #fff;
    margin-bottom: 10px;
  }
  &__type {
    font-size: 30px;
    color: #634085;
    text-align: center;
  }
}
.additionally {
  display: flex;
  width: 60%;
  justify-content: space-between;
  margin: 0 auto;
  &__text-block {
    padding: 30px;
    background-color: #bedef3;
    border-radius: 7px;

    color: #634085;
    font-size: 1rem;
    font-weight: 500;
  }
}
</style>
