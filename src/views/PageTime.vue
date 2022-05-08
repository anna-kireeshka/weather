<template>
  <div class="time-wrap">
    <Navigation />
    <div class="time">
      <p class="time__value">{{ nowTime }}</p>
      <p class="time__value time__value--minutes">{{ time }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Navigation from "@/components/Navigation.vue";

@Component({
  components: { Navigation },
})
export default class PageTime extends Vue {
  date: Date = new Date();
  months: string[] = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ];

  /** Получить время в формате hh:mm*/
  get time(): string {
    let minutes: number = this.date.getMinutes();
    let hours: number = this.date.getHours();
    return `${hours} : ${minutes < 10 ? "0" : ""}${minutes}`;
  }

  /** Получить полную дату */
  get nowTime(): string {
    return `${this.date.getDate()}  ${
      this.months[this.date.getMonth()]
    } ${this.date.getFullYear()} `;
  }
}
</script>

<style scoped lang="scss">
@mixin mobile {
  @media screen and (max-width: 650px) {
    width: 95%;
  }
}
@mixin flex-column {
  display: flex;
  flex-direction: column;
}
.time-wrap {
  @include flex-column
}
.time {
  @include flex-column

  width: 40%;
  margin: 100px auto;
  padding: 50px;
  background-color: #eaeaff;
  box-shadow: -4px 6px 4px -3px #7e84c7;
  border-radius: 7px;
  @include mobile
  &__value {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 600;
    color: #2f263f;
  }
  &__value--minutes {
    margin-top: 10px;
    font-weight: 500;
    color: #4f5e85;
  }
}
</style>
