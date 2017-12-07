<template>
  <div class="container content" v-if="playlist!==undefined">
    <div class="row align-items-center animated fadeIn">
      <!-- The playlist name -->
      <div class="col-md-6 editable text-center text-xs-center text-sm-center text-md-left" v-if="!editing">
        <h1 class="inline-block" id="playlistname"> {{playlist.name}}
          <i class="fa fa-pencil" v-on:click="editPlaylistName" v-if="isUserOwner"></i>
        </h1>
        <p v-if="playlist.owner!==undefined && playlist.owner.id!==undefined">
          By  <router-link :to="`/user/${playlist.owner.id}`">{{playlist.owner.name}}</router-link>
        </p>
      </div>

      <!-- The input html to change the playlist name (invisible by default) -->
      <div class="col-md-6 editable text-center text-xs-center text-sm-center text-md-left change-name-padding" v-if="editing">
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
      <div class="col-md-6 text-center text-xs-center text-sm-center text-md-right">
        <button v-on:click="searchTracks" class="btn btn-light-blue waves-effect waves-light" data-toggle="modal" data-target="#addTracks" v-if="isUserOwner">
          Add random tracks
          <i class="fa fa-music fa-lg" aria-hidden="true"></i>
        </button>
        <button class="btn btn-red waves-effect waves-light" data-toggle="modal" data-target="#deleteConfirm" v-if="isUserOwner">
          Delete playlist
          <i class="fa fa-trash-o fa-lg" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    <hr>
    <!-- Audio element -->
    <audio class="audio-playlist animated fadeIn" autoplay controls ref="audio" v-on:ended="nextSong"></audio>
    <!-- Music list -->
    <div class="card mt-4 mb-4 animated fadeIn">
      <div class="card-body">
        <table class="table text-center">
          <thead>
            <tr class="light-blue-text">
              <th>#</th>
              <th>Play</th>
              <th>Title</th>
              <th class="text-center">Artist</th>
              <th class="text-center">Album</th>
              <th class="text-center">Duration</th>
              <th class="text-center" v-if="isUserOwner">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(track, index) of playlist.tracks" v-if="track !== undefined && track !== null" v-bind:class="{'table-active-song': (index==indexSongPlaying)}">
              <th scope="row" class="align-middle">
                {{index + 1}}
              </th>
              <th class="align-middle">
                <i v-if="index!=indexSongPlaying" class="fa fa-2x fa-play-circle color-play btn-cursor-pointer" v-on:click="playSong(track.previewUrl, index)"></i>
                <i v-if="index==indexSongPlaying" class="fa fa-2x fa-stop-circle btn-cursor-pointer" v-on:click="stopSong"></i>
              </th>
              <td class="text-left align-middle">{{track.trackName}}</td>
              <td class="align-middle">
                <router-link :to="`/artist/${track.artistId}`" v-if="track.artistId!==undefined">{{track.artistName}}</router-link>
              </td>
              <td scope="row" class="align-middle">
                <router-link :to="`/album/${track.collectionId}`" v-if="track.collectionId!==undefined"><img class="picture-size-50" v-bind:src="track.artworkUrl60" onError="this.onerror=null;this.src='https://cdn2.iconfinder.com/data/icons/smiling-face/512/Nothing_Face-512.png'"></router-link>
              </td>
              <td class="align-middle">{{timeInMinutes(track.trackTimeMillis)}}</td>
              <td class="align-middle" v-if="isUserOwner">
                <button class="btn btn-red waves-effect waves-light delete-song-padding" v-on:click="trackToDelete = track.trackId" data-toggle="modal" data-target="#deleteTrackConfirm">
                  <i class="fa fa-trash-o fa-lg" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Modal delete -->
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
    <!-- Modal confirmation delete -->
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
    <!-- Modal add random music -->
    <div class="modal fade" id="addTracks" tabindex="-1" role="dialog" aria-labelledby="deleteConfirmLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addTracksLabel">Add tracks</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <ul class="list-group">
              <li v-for="track in tracksToAdd" class="list-group-item">
                <button type="button" class="btn btn-sm btn-rounded btn-light-blue" v-on:click="addTrack(track)">Add</button>  {{ track.trackName }}
              </li>
            </ul>
          </div>
          <div class="modal-footer">

          </div>
        </div>
      </div>
    </div>
    <ErrorHandler v-bind:message="errorMessage" v-if="showErrorHandler"/>
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
      isUserOwner: false,
      errors: [],
      editing: false,
      newPlaylistName: '',
      indexSongPlaying: undefined,
      tracksToAdd: []
    };
  },
  beforeCreate: function beforeCreate() {
    api.checkPrivileges();
  },
  created: async function created() {
    this.updatePlaylist();
  },
  methods: {
    searchTracks: async function searchTracks() {
      try {
        this.tracksToAdd = [];
        const character = Math.random().toString(36).substring(2, 3);
        const tracks = await api.searchTracks(character);
        for (let i = 0; this.tracksToAdd.length < 4 && i < tracks.length; i += 1) {
          let find = false;
          this.tracksToAdd.forEach((track) => {
            if (track.trackName === tracks[i].trackName) {
              find = true;
            }
          });
          if (!find) {
            this.tracksToAdd.push(tracks[i]);
          }
        }
      } catch (err) {
        this.errorMessage = err.message;
        this.showErrorHandler = true;
      }
    },
    addTrack: async function addTracks(track) {
      try {
        api.addTrackToPlaylist(this.playlist.id, new Array(track));
        this.playlist.tracks.push(track);
      } catch (err) {
        this.errorMessage = err.message;
        this.showErrorHandler = true;
      }
    },
    playSong: function playSong(song, index) {
      this.indexSongPlaying = index;
      this.$refs.audio.src = song;
      this.$refs.audio.play();
    },
    stopSong: function stopSong() {
      this.$refs.audio.src = '';
      this.indexSongPlaying = -1;
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
        const ownerId = this.playlist.owner.id;
        this.playlist = await api.deletePlaylist(playlistId);
        document.location = `./#/user/${ownerId}`;
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
        this.playlist.name = this.newPlaylistName;
        this.playlist = await api.updatePlaylistName(JSON.stringify(this.playlist),
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
        const currentUserId = await api.getCurrentUserId();
        if (this.playlist.owner !== undefined) {
          this.isUserOwner = (this.playlist.owner.id === currentUserId);
        }
      } catch (err) {
        this.errorMessage = err.message;
        this.showErrorHandler = true;
      }
    }
  }
};
</script>
