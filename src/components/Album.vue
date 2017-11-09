<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3 hm-black-strong">
        <a v-bind:href="collectionUrl" target="_blank">
        <div class="view overlay hm-zoom z-depth-2 rounded mb-4">
          <img v-bind:src="artworkUrl" class="img-fluid">
          <div class="mask flex-center waves-effect waves-light">
            <p class="white-text">See on iTunes</p>
          </div>
        </div>
        </a>
      </div>
      <div class="col-md-9">
       <h1>{{ collectionName }}</h1>
        <a v-bind:href="'./#/artist/' + artistId"><h2 class="black-text">{{ artistName }}</h2></a>
        <h3 class="light-blue-text">
          <em>{{ primaryGenreName }}</em>
        </h3>
        <div class="row">
          <div class="col">
            <p>{{ releaseDate }} <br> {{ numberTracks }} tracks</p>
            <button type="button" v-on:click="addAllTracks" class="btn btn-light-blue btn-sm" data-toggle="modal" data-target="#addToPlaylistModal">
              Add all tracks in playlist
            </button>
          </div>
          <div class="col">
            <a v-bind:href="collectionUrl" target="_blank" class="rounded itunes"></a>
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-4 mb-4 animated fadeIn">
      <div class="card-body">
        <table class="table text-center">
          <thead>
          <tr class="light-blue-text">
            <th>#</th>
            <th class="text-center">Title</th>
            <th class="text-center">Duration</th>
            <th class="text-center">Play</th>
          </tr>
          </thead>
          <tbody v-for="(track, index) in tracks">
          <tr>
            <th scope="row" class="align-middle">{{ index + 1 }}</th>
            <td class="align-middle">{{ track.trackName }}</td>
            <td class="align-middle">{{ track.trackDuration }}</td>
            <td>
              <audio controls class="audio-player">
                <source v-bind:src="track.previewUrl" type="audio/mp4">
              </audio>
           </td>
            <td>
              <button type="button" v-on:click="addTrack(allTracks[index])" class="btn btn-light-blue btn-sm" data-toggle="modal" data-target="#addToPlaylistModal">
                <i class="fa fa-plus" aria-hidden="true"></i>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="addToPlaylistModal" tabindex="-1" role="dialog" aria-labelledby="addToPlaylistModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addToPlaylistModalLabel">Add to playlist</h5>
          </div>
          <div class="text-center text-xs-center text-sm-center">
          <div class="modal-body">
            <div class="btn-group">
              <button class="btn btn-light-blue dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ playlists.length > 0 ? playlists[selectedPlaylistIdx].name : '' }}</button>
              <div class="dropdown-menu">
                <a v-for="(playlist, index) in playlists" v-on:click="selectedPlaylistIdx = index" class="dropdown-item">{{playlist.name}}</a>
              </div>
            </div>

          </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light-blue" v-on:click="addToPlaylist" data-dismiss="modal">Add</button>
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
        tracksToAdd: [],
        selectedPlaylistIdx: 0,
        playlists: [],
        artistName: '',
        artistId: '',
        collectionName: '',
        primaryGenreName: '',
        releaseDate: '',
        artworkUrl: '',
        collectionUrl: '',
        numberTracks: 0,
        tracks: [],
        allTracks: []
      };
    },
    created: async function created() {
      const reqHeaders = new Headers({
        Authorization: Vue.config.ubeatToken,
      });

      const albumId = this.$route.params.id;

      const reqLoc = `${Vue.config.ubeatApiLocation}/albums/${albumId}`;

      fetch(new Request(reqLoc, { method: 'GET', headers: reqHeaders }))
        .then(resp => resp.json())
        .then((data) => {
          const album = data.results[0];
          const releaseDate = new Date(album.releaseDate);

          this.artistName = album.artistName;
          this.collectionName = album.collectionName;
          this.primaryGenreName = album.primaryGenreName;
          this.releaseDate = `${releaseDate.getDate()}/${releaseDate.getMonth()}/${releaseDate.getFullYear()}`;
          this.artworkUrl = album.artworkUrl100.replace('100x100', '500x500');
          this.collectionUrl = album.collectionViewUrl;
          this.artistId = album.artistId;
        })
        .catch((err) => {
          console.log(err);
        });

      const reqLocTracks = `${Vue.config.ubeatApiLocation}/albums/${albumId}/tracks`;

      fetch(new Request(reqLocTracks, { method: 'GET', headers: reqHeaders }))
        .then(resp => resp.json())
        .then((data) => {
          this.allTracks = data.results;
          data.results.forEach((track) => {
            const trackDurationFormat = `${Math.floor(track.trackTimeMillis / 60000)}:${((track.trackTimeMillis % 60000) / 1000).toFixed(0)}`;
            this.tracks.push({
              trackName: track.trackName,
              trackDuration: trackDurationFormat,
              previewUrl: track.previewUrl,
              artwork: track.artworkUrl30
            });
          });
          this.numberTracks = this.tracks.length;
        })
        .catch((err) => {
          console.log(err);
        });

      const reqLocPlaylists = `${Vue.config.ubeatApiLocation}/playlists`;
      fetch(new Request(reqLocPlaylists, {
        method: 'GET',
        headers: reqHeaders
      }))
        .then(resp => resp.json())
        .then((data) => {
          for (let i = 0; i < data.length; i += 1) {
            if (data[i].name !== undefined) {
              this.playlists.push({
                name: data[i].name,
                id: data[i].id
              });
            }
          }
        });
    },
    methods: {
      addToPlaylist: function addToPlaylist() {
        if (this.selectedPlaylistIdx < this.playlists.length) {
          const reqLocAdd = `${Vue.config.ubeatApiLocation}/playlists/${this.playlists[this.selectedPlaylistIdx].id}/tracks`;
          const reqHeaders = new Headers({
            Authorization: Vue.config.ubeatToken
          });
          this.tracksToAdd.forEach((track) => {
            const data = new URLSearchParams(track);
            fetch(new Request(reqLocAdd, { method: 'POST', headers: reqHeaders, body: data }));
          });
          this.tracksToAdd = [];
        }
      },
      addTrack: function addTrack(track) {
        this.allTracks = [];
        this.tracksToAdd.push(track);
      },
      addAllTracks: function addAllTracks() {
        this.tracksToAdd = this.allTracks;
      }
    }
  };
</script>

<style>
  .itunes {
    display:inline-block;
    overflow:hidden;
    background:url(//linkmaker.itunes.apple.com/assets/shared/badges/en-us/music-lrg.svg) no-repeat;
    width:110px;
    height:40px;
    background-size:contain;
  }
</style>
