<template>
    <div class="container">
        <div class="col">
        <h1>Playlists</h1>
        <hr>
        </div>
        <playlists :isUser="false" :playlists="playlists"></playlists>
        <!-- Modal for error handler -->
        <ErrorHandler v-bind:message="errorMessage" v-if="showErrorHandler"/>
    </div>
</template>

<script>
import Playlists from './PlaylistsUser';
import ErrorHandler from './ErrorHandler';
import api from '../api';

export default {
  components: {
    ErrorHandler,
    Playlists
  },
  data() {
    return {
      playlists: [],
      showErrorHandler: false,
      errorMessage: '',
    };
  },
  beforeCreate: function beforeCreate() {
    api.checkPrivileges();
  },
  created: async function created() {
    try {
      this.playlists = await api.getPlaylists();
    } catch (err) {
      this.errorMessage = err.message;
      this.showErrorHandler = true;
    }
  }
};
</script>
