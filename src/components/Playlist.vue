<template>
  <div class="container content" v-if="playlist!==undefined">
    <div class="row align-items-center animated fadeIn">
      <!-- The playlist name -->
      <div class="col-md-8 editable text-center text-xs-center text-sm-center text-md-left" v-if="!editing">
        <h1 class="inline-block" id="playlistname"> {{playlist.name}}
          <i class="fa fa-pencil" v-on:click="editPlaylistName"></i>
        </h1>
      </div>

      <!-- The input html to change the playlist name (invisible by default) -->
      <div class="col-md-8 editable text-center text-xs-center text-sm-center text-md-left change-name-padding" v-if="editing">
        <div class="input-group">
          <input type="text" class="form-control editInput" v-model="newPlaylistName" v-bind:placeholder="playlist.name">
          <span class="input-group-btn">
            <button class="btn btn-light-blue" type="button" v-on:click="updatePlaylistName">
              <i class="fa fa-check"></i>
            </button>
          </span>
          <span class="input-group-btn">
            <button class="btn btn-red btn-space-between" type="button" v-on:click="cancelEdit">
              <i class="fa fa-ban"></i>
            </button>
          </span>
        </div>
      </div>
      <div class="col-md-4 text-center text-xs-center text-sm-center text-md-right">
        <button class="btn btn-red waves-effect waves-light" data-toggle="modal" data-target="#deleteConfirm">
          Delete playlist
          <i class="fa fa-trash-o fa-lg" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    <hr>

    <audio class="audio-playlist animated fadeIn" autoplay controls ref="audio" v-on:ended="nextSong"></audio>

    <div class="card mt-4 mb-4 animated fadeIn">
      <div class="card-body">
        <table class="table table-hover text-center">
          <thead>
            <tr class="light-blue-text">
              <th></th>
              <th>#</th>
              <th class="text-center">Title</th>
              <th class="text-center">Artist</th>
              <th class="text-center">Duration</th>
              <th class="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(track, index) of playlist.tracks" v-if="track !== undefined && track !== null" v-on:click="playSong(track.previewUrl, index)" v-bind:class="{'table-active-song': (index==indexSongPlaying)}">
              <th scope="row" class="align-middle"><img class="picture-size-50" v-bind:src="track.artworkUrl60"></th>
              <th scope="row" class="align-middle">
                {{index + 1}}
              </th>
              <td class="align-middle">{{track.trackName}}</td>
              <td class="align-middle">{{track.artistName}}</td>
              <td class="align-middle">{{timeInMinutes(track.trackTimeMillis)}}</td>
              <td class="align-middle">
                <button class="btn btn-red waves-effect waves-light delete-song-padding" v-on:click="deleteSong(track.trackId)">
                  <i class="fa fa-trash-o fa-lg" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="deleteConfirm" tabindex="-1" role="dialog" aria-labelledby="deleteConfirmLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteConfirmLabel">Delete confirmation</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>
              Are you sure you want to delete this playlist?
            </p>
          </div>
          <div class="modal-footer">
            <router-link to="/playlists">
              <button type="button" class="btn btn-light-blue" data-dismiss="modal" v-on:click="deletePlaylist">Yes</button>
            </router-link>
            <button type="button" class="btn btn-red btn-space-between" data-dismiss="modal">No</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  data() {
    return {
      playlist: undefined,
      errors: [],
      editing: false,
      newPlaylistName: '',
      indexSongPlaying: undefined
    };
  },
  created: async function created() {
    this.updatePlaylist();
  },
  methods: {
    playSong: function playSong(song, index) {
      this.indexSongPlaying = index;
      this.$refs.audio.src = song;
      this.$refs.audio.play();
    },
    nextSong: function nextSong() {
      if (this.indexSongPlaying < (this.playlist.tracks.length - 1)) {
        this.indexSongPlaying += 1;
        this.$refs.audio.src = this.playlist.tracks[this.indexSongPlaying].previewUrl;
        this.$refs.audio.play();
      }
    },
    timeInMinutes: function timeInMinutes(millis) {
      let x = Math.floor(millis / 1000);
      const sec = Math.floor(x % 60);
      x /= 60;
      const min = Math.floor(x % 60);
      return `${min}:${sec}`;
    },
    deletePlaylist: async function deletePlaylist() {
      const reqHeaders = new Headers({
        Authorization: Vue.config.ubeatToken,
      });
      this.$refs.audio.pause();
      const playlistId = this.$route.params.id;
      const reqLoc = `${Vue.config.ubeatApiLocation}/playlists/${playlistId}`;
      fetch(new Request(reqLoc, { method: 'DELETE', headers: reqHeaders }))
        .then(() => {
          this.playlist = undefined;
        })
        .catch((error) => {
          this.errors.push(error);
        });
    },
    deleteSong: async function deleteSong(trackId) {
      const reqHeaders = new Headers({
        Authorization: Vue.config.ubeatToken,
      });
      const playlistId = this.$route.params.id;
      const reqLoc = `${Vue.config.ubeatApiLocation}/playlists/${playlistId}/tracks/${trackId}`;
      fetch(new Request(reqLoc, { method: 'DELETE', headers: reqHeaders }))
      .then(resp => resp.json())
        .then(() => {
          this.updatePlaylist();
          this.$refs.audio.src = '';
          this.indexSongPlaying = undefined;
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
      const reqBody = new URLSearchParams(this.playlist);
      reqBody.set('name', this.newPlaylistName);
      const playlistId = this.$route.params.id;
      const reqLoc = `${Vue.config.ubeatApiLocation}/playlists/${playlistId}`;
      fetch(new Request(reqLoc, { method: 'PUT', headers: reqHeaders, body: reqBody }))
        .then(resp => resp.json())
        .then((data) => {
          this.playlist = data;
          this.editing = false;
        })
        .catch((error) => {
          console.log(error);
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
