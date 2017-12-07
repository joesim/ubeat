<template>
  <div class="container">
    <div class="card-body">
      <br/>
      <h3 class="text-center">Search results for: <strong>{{ search }}</strong></h3>
    </div>

    <ul class="nav nav-tabs nav-justified bg-light-blue">
      <li class="nav-item">
        <a class="nav-link active" v-on:click="indexPageArtist = 0"  data-toggle="tab" href="#panel1" role="tab">Artists</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" v-on:click="indexPageAlbum = 0" data-toggle="tab" href="#panel2" role="tab">Albums</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" v-on:click="indexPageSongs = 0"  data-toggle="tab" href="#panel3" role="tab">Songs</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" v-on:click="indexPageUsers = 0"  data-toggle="tab" href="#panel4" role="tab">Users</a>
      </li>
    </ul>

    <div class="tab-content card mb-4">

      <div class="tab-pane fade in show active" id="panel1" role="tabpane1">
        <table class="table text-center" id="table-list-all-artists">
          <tbody v-for="(item, index) in artists">
          <tr v-if="index < indexPageArtist + 3 && index >=  indexPageArtist">
            <th scope="row" class="align-middle"><img v-bind:id="item.artistId" src="http://thinkfuture.com/wp-content/uploads/2013/10/loading_spinner.gif" class="img-fluid table-icon" alt="artist picture"></th>
            <td class="align-middle" v-bind:id="getArtworkImg(item)"><strong>{{ item.artistName }}</strong></td>
            <td class="align-middle light-blue-text"><em>{{ item.primaryGenreName }}</em></td>
            <td class="align-middle">
              <a class="btn btn-light-blue waves-effect waves-light btn-sm" v-bind:href="'./#/artist/'+item.artistId"><i class="fa fa-search mr-1"></i>See more</a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="tab-pane fade" id="panel2" role="tabpanel">
        <table class="table text-center" id="table-list-all-albums">
          <tbody v-for="(item, index) in albums">
          <tr v-if="index < indexPageAlbum + 3 && index >=  indexPageAlbum">
            <th scope="row" class="align-middle"><img v-bind:src="item.artworkUrl100" class="img-fluid table-icon" alt="album picture"></th>
            <td class="align-middle"><strong>{{ item.collectionName }}</strong></td>
            <td class="align-middle">{{ item.artistName }}</td>
            <td class="align-middle"><a class="btn btn-light-blue waves-effect waves-light btn-sm" v-bind:href="'./#/album/'+item.collectionId"><i class="fa fa-search mr-1"></i>See more</a></td>
            <td class="align-middle">
              <button type="button" v-on:click="addAllAlbumTracks(item)" v-bind:disabled="playlists.length <= 0" class="btn btn-light-blue waves-effect waves-light btn-sm" data-toggle="modal" data-target="#addToPlaylistModal">
                Add all tracks in playlist
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="tab-pane fade" id="panel3" role="tabpanel">
        <table class="table text-center" id="table-list-all-songs">
          <tbody v-for="(item, index) in songs">
          <tr v-if="index < indexPageSongs + 3 && index >=  indexPageSongs">
            <th scope="row" class="align-middle"><img v-bind:src="item.artworkUrl100" class="img-fluid table-icon" alt="song picture"></th>
            <td class="align-middle"><strong>{{ item.trackName }}</strong></td>
            <td class="align-middle">{{ item.artistName }}</td>
            <td class="align-middle light-blue-text"><em>{{ item.primaryGenreName }}</em></td>
            <!--<td class="align-middle">-->
              <!--<audio controls class="audio-player">-->
                <!--<source v-bind:src="item.previewUrl" type="audio/mp4">-->
              <!--</audio>-->
            <!--</td>-->
            <th class="align-middle">
              <i v-if="index!=indexSongPlaying" class="fa fa-2x fa-play-circle color-play btn-cursor-pointer" v-on:click="playSong(item.previewUrl, index)"></i>
              <i v-if="index==indexSongPlaying" class="fa fa-2x fa-stop-circle btn-cursor-pointer" v-on:click="stopSong"></i>
            </th>
            <td class="align-middle">
              <button type="button" v-on:click="addTrack(item)" v-bind:disabled="playlists.length <= 0" class="btn btn-light-blue waves-effect waves-light btn-sm" data-toggle="modal" data-target="#addToPlaylistModal">
                <i class="fa fa-plus" aria-hidden="true"></i>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="tab-pane fade" id="panel4" role="tabpanel">
        <table class="table text-center" id="table-list-all-users">
          <tbody v-for="(item, index) in users">
          <tr v-if="index < indexPageUsers + 3 && index >=  indexPageUsers">
            <td class="align-middle"><strong>{{ item.name }}</strong></td>
            <td class="align-middle">{{ item.email }}</td>
            <td class="align-middle">
              <a class="btn btn-light-blue waves-effect waves-light btn-sm" v-bind:href="'./#/user/'+item.id"><i class="fa fa-search mr-1"></i>See more</a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="d-flex justify-content-center">
        <ul class="pagination pagination-square pg-blue mb-0">
          <li class="page-item">
            <a class="page-link" aria-label="Previous" v-on:click="previousPage">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" aria-label="Next" v-on:click="nextPage">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <audio class="audio-playlist animated fadeIn" id="audio" autoplay controls ref="audio" v-on:ended="stopSong" style="display: none"></audio>

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
    data() {
      return {
        showErrorHandler: false,
        errorMessage: '',
        indexPageAlbum: 0,
        indexPageArtist: 0,
        indexPageSongs: 0,
        indexPageUsers: 0,
        artists: [],
        albums: [],
        songs: [],
        users: [],
        tracksToAdd: [],
        allAlbumTracks: [],
        selectedPlaylistIdx: 0,
        playlists: [],
        indexSongPlaying: undefined
      };
    },
    beforeCreate: function beforeCreate() {
      api.checkPrivileges();
    },
    created: async function created() {
      this.research();
      try {
        const currentUserId = await api.getCurrentUserId();
        const playlists = await api.getPlaylists(currentUserId);
        for (let i = 0; i < playlists.length; i += 1) {
          if (playlists[i].name !== undefined) {
            this.playlists.push({
              name: playlists[i].name,
              id: playlists[i].id
            });
          }
        }
      } catch (err) {
        this.errorMessage = err.message;
        this.showErrorHandler = true;
      }
    },
    props: ['search'],
    watch: {
      search: function update() {
        this.research();
      }
    },
    methods: {
      nextPage: function nextPage() {
        if (this.indexPageAlbum + 3 < this.albums.length) {
          this.indexPageAlbum += 3;
        }
        if (this.indexPageArtist + 3 < this.artists.length) {
          this.indexPageArtist += 3;
        }
        if (this.indexPageSongs + 3 < this.songs.length) {
          this.indexPageSongs += 3;
        }
        if (this.indexPageUsers + 3 < this.users.length) {
          this.indexPageUsers += 3;
        }
      },
      previousPage: function nextPage() {
        if (this.indexPageAlbum - 3 >= 0) {
          this.indexPageAlbum -= 3;
        }
        if (this.indexPageArtist - 3 >= 0) {
          this.indexPageArtist -= 3;
        }
        if (this.indexPageSongs - 3 >= 0) {
          this.indexPageSongs -= 3;
        }
        if (this.indexPageUsers - 3 >= 0) {
          this.indexPageUsers -= 3;
        }
      },
      research: async function research() {
        this.songs = [];
        this.albums = [];
        this.artists = [];
        this.users = [];
        try {
          const result = await api.search(this.search);
          result.forEach((item) => {
            if (item.wrapperType === 'track') {
              this.songs.push(item);
            } else if (item.wrapperType === 'artist') {
              this.artists.push(item);
            } else if (item.wrapperType === 'collection') {
              this.albums.push(item);
            } else {
              this.users.push(item);
            }
          });
        } catch (err) {
          this.errorMessage = err.message;
          this.showErrorHandler = true;
        }
      },
      addToPlaylist: function addToPlaylist() {
        if (this.selectedPlaylistIdx < this.playlists.length) {
          try {
            api.addTrackToPlaylist(this.playlists[this.selectedPlaylistIdx].id, this.tracksToAdd);
            this.tracksToAdd = [];
          } catch (err) {
            this.errorMessage = err.message;
            this.showErrorHandler = true;
          }
        }
      },
      addAllAlbumTracks: async function addAllTracks(album) {
        const data = await api.getTracksAlbum(album.collectionId);
        data.results.forEach((track) => {
          this.tracksToAdd.push(track);
        });
      },
      addTrack: function addTrack(track) {
        this.tracksToAdd.push(track);
      },
      playSong: function playSong(song, index) {
        document.getElementById('audio').style.display = '';
        this.indexSongPlaying = index;
        this.$refs.audio.src = song;
        this.$refs.audio.play();
      },
      stopSong: function stopSong() {
        this.$refs.audio.src = '';
        this.indexSongPlaying = -1;
        document.getElementById('audio').style.display = 'none';
      },
      getArtworkImg: async function getArtworkImg(artist) {
        const artworkUrl = await api.getImageArtist(artist.artistLinkUrl);
        document.getElementById(artist.artistId).src = artworkUrl;
      }
    }
  };
</script>
