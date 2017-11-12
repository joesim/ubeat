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
            <tr v-for="(track, index) of playlist.tracks" v-if="track !== undefined && track !== null" v-bind:class="{'table-active-song': (index==indexSongPlaying)}">
              <th v-on:click="playSong(track.previewUrl, index)" scope="row" class="align-middle"><img class="picture-size-50" v-bind:src="track.artworkUrl60" onError="this.style.visibility = 'hidden'"></th>
              <th scope="row" class="align-middle">
                {{index + 1}}
              </th>
              <td class="align-middle">{{track.trackName}}</td>
              <td class="align-middle">{{track.artistName}}</td>
              <td class="align-middle">{{timeInMinutes(track.trackTimeMillis)}}</td>
              <td class="align-middle">
                <button class="btn btn-red waves-effect waves-light delete-song-padding" v-on:click="trackToDelete = track.trackId" data-toggle="modal" data-target="#deleteTrackConfirm">
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
            <button type="button" class="btn btn-light-blue" data-dismiss="modal" v-on:click="deletePlaylist">Yes</button>
            <button type="button" class="btn btn-red btn-space-between" data-dismiss="modal">No</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="deleteTrackConfirm" tabindex="-1" role="dialog" aria-labelledby="deleteTrackConfirmLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteTrackConfirmLabel">Delete confirmation</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>
              Are you sure you want to delete this track?
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light-blue" data-dismiss="modal" v-on:click="deleteSong(trackToDelete)">Yes</button>
            <button type="button" class="btn btn-red btn-space-between" data-dismiss="modal">No</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorHandler from './ErrorHandler';
import api from '../api';

export default {
  components: {
    ErrorHandler
  },
  data() {
    return {
      errorMessage: '',
      showErrorHandler: false,
      trackToDelete: 0,
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
      this.$refs.audio.pause();
      try {
        const playlistId = this.$route.params.id;
        this.playlist = await api.deletePlaylist(playlistId);
        document.location = './#/playlists';
      } catch (err) {
        this.errorMessage = err.message;
        this.showErrorHandler = true;
      }
    },
    deleteSong: async function deleteSong(trackId) {
      const playlistId = this.$route.params.id;
      try {
        await api.deleteSong(playlistId, trackId);
        this.updatePlaylist();
        this.$refs.audio.src = '';
        this.indexSongPlaying = undefined;
      } catch (err) {
        this.errorMessage = err.message;
        this.showErrorHandler = true;
      }
    },
    editPlaylistName: function editPlaylistName() {
      this.editing = true;
    },
    cancelEdit: function cancelEdit() {
      this.editing = false;
    },
    updatePlaylistName: async function updatePlaylistName() {
      try {
        this.playlist = await api.updatePlaylistName(this.playlist, this.newPlaylistName,
            this.$route.params.id);
        this.editing = false;
      } catch (err) {
        this.errorMessage = err.message;
        this.showErrorHandler = true;
      }
    },
    updatePlaylist: async function updatePlaylist() {
      try {
        const playlistId = this.$route.params.id;
        this.playlist = await api.getPlaylist(playlistId);
      } catch (err) {
        this.errorMessage = err.message;
        this.showErrorHandler = true;
      }
    }
  }
};
</script>
