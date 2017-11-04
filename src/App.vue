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
</script>

<style>
</style>
