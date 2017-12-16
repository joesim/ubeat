<template>
  <div class="container">
    <div class="login card">
      <div class="card-body">
        <form>
          <p class="h5 text-center mb-4">Sign in</p>

          <div class="md-form">
            <i class="fa fa-envelope prefix grey-text"></i>
            <input v-model="email" type="text" id="defaultForm-email" class="form-control" placeholder="Your email">
          </div>

          <div class="md-form">
            <i class="fa fa-lock prefix grey-text"></i>
            <input v-model="password" type="password" id="defaultForm-pass" class="form-control" placeholder="Your password">
          </div>

          <div class="text-center md-form">
            <button type="button" v-on:click="login" class="btn btn-light-blue">Login</button>
          </div>

          <div class="text-center">
            <a href="/#/signup" title="Create an account">Create an account</a>
          </div>

        </form>
        </div>
    </div>
    <!-- Modal for error handler -->
    <ErrorHandler v-bind:message="errorMessage" v-if="showErrorHandler"/>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import ErrorHandler from './ErrorHandler';
import api from '../api';

export default {
  components: {
    ErrorHandler
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      showErrorHandler: false,
    };
  },
  methods: {
    login: async function login() {
      try {
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!re.test(this.email)) {
          this.errorMessage = 'Invalid email address';
          this.showErrorHandler = true;
        } else {
          const loginRet = await api.login(this.email, this.password);
          Cookies.set('token', loginRet.token, { expires: 7, path: '/' });
          window.location = '/#/';
        }
      } catch (err) {
        this.errorMessage = err.message;
        this.showErrorHandler = true;
      }
    }
  }
};
</script>

<style>
</style>