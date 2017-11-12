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
Vue.config.ubeatApiLocation = 'https://ubeat.herokuapp.com/unsecure';
Vue.config.ubeatToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1OWZlMWU3ODQ1NmIxYjAwMDQ5M2RhNDQiLCJleHAiOjE1MTAwMDg5Njg4NTB9.qZnr0-qXHKT_qEVaRVAdnpb4wPH_a6mFQUpfxPm20K4';
</script>

<style>
</style>
