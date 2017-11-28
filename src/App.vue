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
Vue.config.ubeatToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1YTFhMWY3MDRkMDc5YzIzMzg4OGI4NDciLCJleHAiOjE1MTE5MTg2NzQ5NTN9.whSd0y50iYRw0bVDiHR4KPRIl4KtWBPMszwswT5VVXE';
</script>

<style>
</style>
