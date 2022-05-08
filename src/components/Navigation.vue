<template>
  <div class="navigation">
    <div class="navigation-routes">
      <router-link
        :to="{ name: 'Time' }"
        class="navigation-routes__link"
        :class="{ 'navigation-routes__link--active': routerName === 'Time' }"
        >Время</router-link
      >
      <router-link
        :to="{ name: 'Weather' }"
        class="navigation-routes__link"
        :class="{ 'navigation-routes__link--active': routerName === 'Weather' }"
        >Погода</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Navigation extends Vue {
  /** Имя роута */
  get routerName(): string {
    return this.$route.name ? this.$route.name : "";
  }
}
</script>

<style scoped lang="scss">
.navigation {
  width: 100vw;
  background-color: #ecdbf8;
}

.navigation-routes {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  &__link {
    font-size: 2rem;
    font-weight: 500;
    text-decoration: none;
    color: #2f263f;
    margin-right: 60px;
  }
  &__link:hover,
  &__link--active {
    color: #7b25c0;
  }
}
</style>
