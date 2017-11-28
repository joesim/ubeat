<template>
    <div class="container animated"> 
        <div class="row align-items-center">
            <div class="col-6 col-lg-4 col-md-6 col-sm-6" v-for="following of followings" v-if="following!==undefined">
                <a :href="`/#/user/${getIdFollowing(following.email)}`">
                    <div class="card card-playlist-margin card-outline-success">
                        <div class="row align-items-center card-playlist-padding">
                            <div class="col-md-4 text-center">
                                <gravatar :email="following.email" :size="80" />
                            </div>
                            <div class="col-md-8">
                                <div>
                                    <h4 class="inline-block">
                                        <i class="fa fa-user"></i>
                                        {{following.name}}
                                    </h4>
                                </div>
                                <p class="card-text">
                                    <small class="text-time">
                                        <em>{{following.email}}</em>
                                    </small>
                                </p>
                            </div>

                        </div>
                    </div>
                </a>
            </div>
        </div>

        <!-- Modal for error handler -->
        <ErrorHandler v-bind:message="errorMessage" v-if="showErrorHandler"/>
    </div>
</template>

<script>

import Gravatar from 'vue-gravatar';
import ErrorHandler from './ErrorHandler';

export default {
  components: {
    ErrorHandler,
    Gravatar
  },
  props: {
    followings: {
      type: Array
    },
    users: {
      type: Array
    }
  },
  data() {
    return {
      showErrorHandler: false,
      errorMessage: ''
    };
  },
  methods: {
    getIdFollowing: function getIdFollowing(email) {
      for (let i = 0; i < this.users.length; i += 1) {
        if (this.users[i].email === email) {
          return this.users[i].id;
        }
      }
      return undefined;
    }
  }
};
</script>