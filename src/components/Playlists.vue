<template>
    <div class="container animated"> 
        <div class="row align-items-center">
            <div class="col-6 col-lg-4 col-md-6 col-sm-6" v-for="playlist of playlists" v-if="playlist!==undefined">
                <a v-bind:href="`/#/playlists/${playlist.id}`">
                    <div class="card card-playlist-margin card-outline-success">
                        <div class="row align-items-center card-playlist-padding">
                            <div class="col-md-4 text-center">
                                <img class="picture-size-80" :src="playlist.tracks[0].artworkUrl100" v-if="playlist.tracks.length!=0 && playlist.tracks[0] !== null" onError="this.style.visibility = 'hidden'">
                                <img class="picture-size-80" src="https://cdn2.iconfinder.com/data/icons/smiling-face/512/Nothing_Face-512.png" v-if="playlist.tracks.length===0 || playlist.tracks[0]===null">
                            </div>
                            <div class="col-md-8">
                                <div>
                                    <h4 class="inline-block">
                                        {{playlist.name}}
                                    </h4>
                                </div>
                                <p class="card-text">
                                    <small class="text-time">
                                        <em>{{playlist.tracks.length}} songs</em>
                                    </small>
                                </p>
                            </div>

                        </div>
                    </div>
                </a>
            </div>
            <div class="col-6 col-lg-4 col-md-6 col-sm-6 text-center" style="padding-top:30px;padding-bottom:30px">
            <button type="button" class="btn btn-primary waves-effect waves-light" data-toggle="modal" data-target="#newPlaylistModal" v-if="isUser">
                    Create new playlist
                    <i class="fa fa-headphones fa-lg" aria-hidden="true"></i>
                </button>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="newPlaylistModal" tabindex="-1" role="dialog" aria-labelledby="newPlaylistModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="newPlaylistModalLabel">New playlist</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="md-form">
                            <i class="fa fa-headphones prefix" aria-hidden="true"></i>
                            <input type="text" id="form2" class="form-control" v-model="newPlaylistName">
                            <label for="form2">New playlist name</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light-blue" data-dismiss="modal" v-on:click="createPlaylist" v-if="newPlaylistName!==''">Create</button>
                        <button type="button" class="btn btn-red btn-space-between" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal for error handler -->
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
  props: {
    playlists: {
      type: Array
    },
    isUser: false
  },
  data() {
    return {
      showErrorHandler: false,
      errorMessage: '',
      newPlaylistName: ''
    };
  },
  beforeCreate: function beforeCreate() {
    api.checkPrivileges();
  },
  methods: {
    createPlaylist: async function createPlaylist() {
      try {
        const playlist = await api.createPlaylist(this.newPlaylistName);
        this.playlists.push(playlist);
      } catch (err) {
        this.errorMessage = err.message;
        this.showErrorHandler = true;
      }
    }
  }
};
</script>