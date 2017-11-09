<template>
    <div class="container animated">
        <div class="row align-items-center">
            <!-- The playlist name -->
            <div class="col-md-8 text-center text-xs-center text-sm-center text-md-left">
                <h1 style="display:inline-block;" id="playlistname"> Playlists </h1>
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
            <div class="col-6 col-lg-4 col-md-6 col-sm-6" v-for="playlist of playlists" v-if="playlists.length>0">
                <a v-bind:href="`/#/playlists/${playlist.id}`">
                    <div class="card" style="margin:5px;">
                        <div class="row align-items-center" style="padding:15px">
                            <div class="col-md-4 text-center">
                                <img class="" style="width:80px;height:100px" :src="playlist.tracks[0].artworkUrl100" v-if="playlist.tracks.length!=0">
                                <img class="" style="width:80px;height:100px;" src="https://cdn2.iconfinder.com/data/icons/smiling-face/512/Nothing_Face-512.png" v-if="playlist.tracks.length==0">
                            </div>
                            <div class="col-md-8">
                                <div class="">
                                    <h4 style="display:inline-block">
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
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="createPlaylist" v-if="newPlaylistName!==''">Create</button>
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
      newPlaylistName: ''
    };
  },
  created: async function created() {
    const reqHeaders = new Headers({
      Authorization: Vue.config.ubeatToken,
    });
    const reqLoc = `${Vue.config.ubeatApiLocation}/playlists`;
    fetch(new Request(reqLoc, { method: 'GET', headers: reqHeaders }))
    .then(resp => resp.json())
    .then((data) => {
      for (let i = 0; i < data.length; i += 1) {
        if (data[i].name !== undefined) {
          this.playlists.push(data[i]);
        }
      }
    })
    .catch((error) => {
      this.error.push(error);
    });
  },
  methods: {
    createPlaylist: function createPlaylist() {
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

<style scoped>
.btn-stick-corner {
    padding: 6px;
    position: absolute;
    right: 30px;
    bottom: 5px;
}
</style>

