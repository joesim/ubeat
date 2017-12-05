<template>
    <div class="container">
      <div class="signup card">
        <div class="card-body">
        <form>
            <p class="h5 text-center mb-4">Sign up</p>

            <div class="md-form">
                <i class="fa fa-user prefix grey-text"></i>
                <input v-model="name" type="text" id="orangeForm-name" class="form-control">
                <label for="orangeForm-name">Your name</label>
            </div>
            <div class="md-form">
                <i class="fa fa-envelope prefix grey-text"></i>
                <input v-model="email" type="text" id="orangeForm-email" class="form-control">
                <label for="orangeForm-email">Your email</label>
            </div>

            <div class="md-form">
                <i class="fa fa-lock prefix grey-text"></i>
                <input v-model="password" type="password" id="orangeForm-pass" class="form-control">
                <label for="orangeForm-pass">Your password</label>
            </div>

            <div class="text-center md-form">
                <button type="button" v-on:click="signup" class="btn btn-light-blue">Sign up</button>
            </div>

            <div class="text-center">
              <a href="/#/login" title="Already have an account?">Already have an account?</a>
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
      name: '',
      password: '',
      errorMessage: '',
      showErrorHandler: false,
    };
  },
  methods: {
    signup: async function signup() {
      try {
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!re.test(this.email)) {
          this.errorMessage = 'Invalid email address';
          this.showErrorHandler = true;
        } else if (this.password.length < 4) {
          this.errorMessage = 'Password is too short';
          this.showErrorHandler = true;
        } else {
          const user = await api.signup(this.email, this.password, this.name);
          const login = await api.login(user.email, this.password);
          Cookies.set('token', login.token, { expires: 7, path: '/' });
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