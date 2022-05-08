<template>
  <div>
    <div class="home-wrap">
      <Navigation />
      <div class="main-content">
        <h1 class="main-content__title">
          Добро пожаловать в наше приложение:)
        </h1>
        <p class="main-content__text">
          Здесь ты можешь узнать время и погоду в любой точке мире.
        </p>
        <p class="main-content__text">Обещаю, тебе у нас понравится!</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Navigation from "@/components/Navigation.vue";

@Component({
  components: { Navigation },
})
export default class MainPage extends Vue {}
</script>

<style scoped lang="scss">
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
@mixin flex-column {
  display: flex;
  flex-direction: column;
}
.home-wrap {
  @include flex-column;
}
.main-content {
  @include flex-column;
  width: 40%;
  margin: 100px auto;
  padding: 50px;
  background-color: #ecdbf8;
  box-shadow: -4px 6px 4px -3px #987ec7;
  border-radius: 7px;
  @include min-desctop;
  @include mobile;
  &__title {
    font-size: 2rem;
    margin-bottom: 1rem;
    @media screen and (max-width: 650px) {
      font-size: 1rem;
    }
  }
  &__text {
    @media screen and (max-width: 650px) {
      font-size: 0.8rem;
    }
  }
}
</style>
