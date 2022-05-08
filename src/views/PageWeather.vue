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
        <button class="weather__action" @click="resetSearchQuery">x</button>
      </div>
      <div v-if="isLoaded && !isError" class="weather__info">
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
      <div class="err" v-if="isError && !this.isLoaded">
        <p class="err__message">
          Нет результатов по такому запросу. <br />
          Проверьте правильность написания города
        </p>
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
  isError: boolean = false;
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
        this.isLoaded = true;
        this.isError = false;
        this.temp = Math.round(response.data.main.temp);
        this.tempFeelLikes = Math.round(response.data.main.feels_like);
        this.wingSpeed = response.data.wind.speed;
        let weatherTypeEng = response.data.weather[0].main;
        this.weatherType = this.weatherTypeRuTranslit[weatherTypeEng];
      })

      .catch((err) => {
        if ((err.code = 404)) {
          this.isError = true;
          this.isLoaded = false;
        }
      });
  }

  /** Поиск */
  goSearch(event: KeyboardEvent) {
    if (event.key === "Enter" && this.searchCountry) {
      this.$router.push({ query: { search: this.searchCountry } });
      this.getCallApi();
      this.isLoaded = true;
    }
  }
  resetSearchQuery() {
    this.searchCountry = "";
  }
}
</script>

<style scoped lang="scss">
@mixin border-style {
  width: 60%;
  border-radius: 7px;
}
@mixin font-medium {
  font-size: 1rem;
  font-weight: 500;
}
@mixin min-desctop {
  @media screen and (max-width: 1128px) {
    width: 70%;
  }
}
@mixin mobile {
  @media screen and (max-width: 650px) {
    width: 95%;
  }
}

.weather {
  width: 50%;
  background: linear-gradient(#ead9fa, #9dd3e380);
  margin: 100px auto;
  padding: 30px;
  border-radius: 7px;
  @include min-desctop;
  @include mobile;

  &__search-box {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    width: 60%;
    @include min-desctop;
    @include mobile;
  }
  &__search-input {
    background-color: #faf7fc;
    padding: 20px 40px;
    border: none;
    border-radius: 10px 0 10px 0;
    outline: none;
    @include min-desctop;
    @include mobile;
  }
  &__search-input[type="text"] {
    width: 100%;
    @media screen and (max-width: 650px) {
      font-size: 1rem;
    }
    font-size: 1.5rem;
    color: #634085;
  }
  &__search-input:focus,
  &__search-input:hover {
    border-radius: 10px 0 10px 0;
    box-shadow: 1px 3px 20px 1px #c39ee7;
  }
  &__action {
    padding: 20px;
    background-color: #7b25c0;
    color: #faf7fc;
    border-radius: 10px 0 10px 0;
    border: none;
    margin-left: 10px;
    outline: none;
    font-size: 1.5rem;
    cursor: pointer;
    @media screen and (max-width: 650px) {
      font-size: 1rem;
    }
  }
  &__action:hover {
    background-color: #c78ff6;
    color: #faf7fc;
  }
  &__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
.location {
  @include border-style;
  margin: 40px auto 20px;
  background-color: #d6b5f5;
  @include min-desctop;
  @include mobile;

  &__city {
    font-size: 2rem;
    color: #fff;
    text-align: center;
  }
}
.temperature {
  @include border-style;
  margin: auto 0 20px;
  padding: 30px 50px;
  background-color: rgba(157, 211, 227, 0.5);

  @include min-desctop;
  @include mobile;
  &__count {
    font-size: 90px;
    font-weight: 900;
    text-align: center;
    color: #634085;
    text-shadow: 8px 6px #fff;
    margin-bottom: 10px;
  }
  &__type {
    font-size: 1.5rem;
    font-weight: 500;
    color: #634085;
    text-align: center;
  }
}
.additionally,
.err {
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin: 0 auto;

  @media screen and (max-width: 1128px) {
    display: flex;
    flex-direction: column;
    width: 70%;
  }
  @include mobile;
  &__text-block {
    @include font-medium;
    padding: 30px;
    background-color: #bedef3;
    border-radius: 7px;

    color: #634085;
    @media screen and (max-width: 1128px) {
      margin-bottom: 20px;
    }
  }
}
.err {
  @include border-style;
  margin-top: 20px;
  padding: 30px 50px;
  background-color: #e78497;
  &__message {
    @include font-medium;
    color: #421f28;
  }
}
</style>
