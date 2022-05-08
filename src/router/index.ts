import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import mainPage from "@/views/MainPage.vue";
import time from "@/views/PageTime.vue";
import weather from "@/views/PageWeather.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "MainPage",
    component: mainPage,
  },
  {
    path: "/time",
    name: "Time",
    component: time,
  },
  {
    path: "/weather",
    name: "Weather",
    component: weather,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
