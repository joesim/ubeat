<template>
    <div class="container animated">
        <div class="row align-items-center">
            <!-- The playlist name -->
            <div class="col-md-8 text-center text-xs-center text-sm-center text-md-left">
                <h1 class="inline-block" id="playlistname"> Playlists </h1>
            </div>
            <div class="col-md-4 text-center text-xs-center text-sm-center text-md-right">
                <button type="button" class="btn btn-primary waves-effect waves-light" data-toggle="modal" data-target="#newPlaylistModal">
                    Create new playlist
                    <i class="fa fa-headphones fa-lg" aria-hidden="true"></i>
                </button>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-6 col-lg-4 col-md-6 col-sm-6" v-for="playlist of playlists" v-if="playlist!==undefined">
                <a v-bind:href="`/#/playlists/${playlist.id}`">
                    <div class="card card-playlist-margin">
                        <div class="row align-items-center card-playlist-padding">
                            <div class="col-md-4 text-center">
                                <img class="picture-size-80" :src="playlist.tracks[0].artworkUrl100" v-if="playlist.tracks.length!=0 && playlist.tracks[0] !== null">
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
    </div>
</template>

<script>
import Vue from 'vue';

export default {
  data() {
    return {
      playlists: [],
      errors: [],
      newPlaylistName: '',
      userEmail: ''
    };
  },
  created: async function created() {
    const reqHeaders = new Headers({
      Authorization: Vue.config.ubeatToken,
    });
    const reqLocTok = `${Vue.config.ubeatApiLocation}/playlists`;
    fetch(new Request(reqLocTok, { method: 'GET', headers: reqHeaders }))
    .then(resp => resp.json())
    .then((data) => {
      for (let i = 0; i < data.length; i += 1) {
        if (data[i].name !== undefined) {
          this.playlists.push(data[i]);
        }
      }
    })
    .catch((error) => {
      this.errors.push(error);
    });
  },
  methods: {
    showPlaylists: async function showPlaylists() {
      const reqHeaders = new Headers({
        Authorization: Vue.config.ubeatToken,
      });
      const reqLoc = `${Vue.config.ubeatApiLocation}/playlists`;
      fetch(new Request(reqLoc, { method: 'GET', headers: reqHeaders }))
      .then(resp => resp.json())
      .then((data) => {
        for (let i = 0; i < data.length; i += 1) {
          if (data[i].owner !== undefined &&
           data[i].owner.email === this.userEmail) {
            this.playlists.push(data[i]);
          }
        }
      })
      .catch((error) => {
        this.error.push(error);
      });
    },
    createPlaylist: async function createPlaylist() {
      const reqHeaders = new Headers({
        Authorization: Vue.config.ubeatToken
      });
      const reqBody = new URLSearchParams({
        name: this.newPlaylistName
      });
      const reqLoc = `${Vue.config.ubeatApiLocation}/playlists`;
      fetch(new Request(reqLoc, { method: 'POST', headers: reqHeaders, body: reqBody }))
        .then(resp => resp.json())
        .then((data) => {
          this.playlists.push(data);
        })
        .catch((error) => {
          this.errors.push(error);
        });
    }
  }
};
</script>
