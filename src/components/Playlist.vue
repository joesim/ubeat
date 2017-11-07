<template>
  <div class="container animated fadeIn">
    <div class="row align-items-center">
      <!-- The playlist name -->
      <div class="col-md-8 editable text-xs-center text-sm-center text-md-left" v-if="!editing">
        <h1 style="display:inline-block;" id="playlistname"> {{playlist.name}}
          <i class="fa fa-pencil" v-on:click="editPlaylistName"></i>
        </h1>
      </div>

      <!-- The input html to change the playlist name (invisible by default) -->
      <div class="col-md-8 editable text-xs-center text-sm-center text-md-left" style="padding:5px" v-if="editing">
        <div class="input-group">
          <input type="text" class="form-control editInput" v-model="newPlaylistName" v-bind:placeholder="playlist.name">
          <span class="input-group-btn">
            <button class="btn btn-success" type="button"v-on:click="updatePlaylistName">
              <i class="fa fa-check"></i>
            </button>
          </span>
          <span class="input-group-btn">
            <button class="btn btn-danger" type="button" v-on:click="cancelEdit">
              <i class="fa fa-ban"></i>
            </button>
          </span>
        </div>
      </div>
      <div class="col-md-4 text-xs-center text-sm-center text-md-right">
        <button class="btn btn-danger waves-effect waves-light" v-on:click="deletePlaylist">
          Delete playlist
          <i class="fa fa-trash-o fa-lg" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    
    <div class="card mt-4 mb-4">
      <div class="card-body">
        <table class="table text-center">
          <thead>
            <tr class="light-blue-text">
              <th></th>
              <th>#</th>
              <th class="text-center">Title</th>
              <th class="text-center">Artist</th>
              <th class="text-center">Duration</th>
              <th class="text-center">Play</th>
              <th class="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(track, index) of playlist.tracks">
              <th scope="row" class="align-middle"><img style="height:50px;width:50px" v-bind:src="track.artworkUrl60"></th>
              <th scope="row" class="align-middle">{{index + 1}}</th>
              <td class="align-middle">{{track.trackName}}</td>
              <td class="align-middle">{{track.artistName}}</td>
              <td class="align-middle">{{timeInMinutes(track.trackTimeMillis)}}</td>
              <td class="align-middle">
                <button class="btn btn-light-blue waves-effect waves-light">
                  <i class="fa fa-caret-right mr-1"></i> Play</button>
              </td>
              <td class="align-middle">
                <button style="padding:10px" class="btn btn-red waves-effect waves-light" v-on:click="deleteSong(track.trackId)">
                  <i class="fa fa-trash-o fa-lg" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  data() {
    return {
      playlist: [],
      errors: [],
      editing: false,
      newPlaylistName: ''
    };
  },
  created: async function created() {
    this.updatePlaylist();
  },
  methods: {
    timeInMinutes: function timeInMinutes(millis) {
      let x = Math.floor(millis / 1000);
      const sec = Math.floor(x % 60);
      x /= 60;
      const min = Math.floor(x % 60);
      return `${min}:${sec}`;
    },
    deletePlaylist: function deletePlaylist() {
      const reqHeaders = new Headers({
        Authorization: Vue.config.ubeatToken,
      });
      const playlistId = this.$route.params.id;
      const reqLoc = `${Vue.config.ubeatApiLocation}/playlists/${playlistId}`;
      fetch(new Request(reqLoc, { method: 'DELETE', headers: reqHeaders }))
        .then(() => {
          this.playlist = [];
        })
        .catch((error) => {
          this.errors.push(error);
        });
    },
    deleteSong: function deleteSong(trackId) {
      const reqHeaders = new Headers({
        Authorization: Vue.config.ubeatToken,
      });
      const playlistId = this.$route.params.id;
      const reqLoc = `${Vue.config.ubeatApiLocation}/playlists/${playlistId}/tracks/${trackId}`;
      fetch(new Request(reqLoc, { method: 'DELETE', headers: reqHeaders }))
      .then(resp => resp.json())
        .then(() => {
          this.updatePlaylist();
        })
        .catch((error) => {
          this.errors.push(error);
        });
    },
    editPlaylistName: function editPlaylistName() {
      this.editing = true;
    },
    cancelEdit: function cancelEdit() {
      this.editing = false;
    },
    updatePlaylistName: function updatePlaylistName() {
      const reqHeaders = new Headers({
        Authorization: Vue.config.ubeatToken
      });
      const reqBody = new URLSearchParams({
        name: this.newPlaylistName
      });
      const playlistId = this.$route.params.id;
      const reqLoc = `${Vue.config.ubeatApiLocation}/playlists/${playlistId}`;
      fetch(new Request(reqLoc, { method: 'PUT', headers: reqHeaders, body: reqBody }))
        .then(resp => resp.json())
        .then((data) => {
          this.playlist = data;
          this.editing = false;
        })
        .catch((error) => {
          this.errors.push(error);
        });
    },
    updatePlaylist: async function updatePlaylist() {
      const reqHeaders = new Headers({
        Authorization: Vue.config.ubeatToken
      });
      const playlistId = this.$route.params.id;
      const reqLoc = `${Vue.config.ubeatApiLocation}/playlists/${playlistId}`;
      fetch(new Request(reqLoc, { method: 'GET', headers: reqHeaders }))
        .then(resp => resp.json())
        .then((data) => {
          this.playlist = data;
        })
        .catch((error) => {
          this.errors.push(error);
        });
    }
  }
};
</script>


<style scoped>
.editable .fa-pencil {
  display: none;
  cursor: pointer;
  margin-left: 5px;
}

.editable:hover .fa-pencil {
  display: inline-block;
}

.editable span:hover .fa-pencil {
  display: inline-block;
}

.editable input:hover .fa-pencil {
  display: none;
}

.editInput {
  font-size: 2em;
}
</style>

