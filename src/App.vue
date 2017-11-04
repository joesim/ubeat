<template>
  <div id="app">
    <nav-menu></nav-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation';
import Vue from 'vue';

export default {
  name: 'app',
  components: {
    'nav-menu': Navigation
  }
};
Vue.config.ubeatApiLocation = 'http://localhost:3000';
Vue.config.ubeatToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1OWZjZmE3ODI5NTgzODE4YzI0ZTUxYjUiLCJleHAiOjE1MDk4NDExNjY0OTN9.odKJlbUZk5Nr51tczcToIuAgXK9zSDLHkcHoK9f9_rI';
</script>

<style>
</style>
