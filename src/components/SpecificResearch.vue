<template>
  <div class="container">
    <div class="accordion" id="accordionReseachParams" role="tablist" aria-multiselectable="true">
      <div class="card">

        <div class="card-header" role="tab" id="headingOne">
          <a class="btn btn-collapse bg-light-blue" data-toggle="collapse" data-parent="#accordionReseachParams" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            <h5 class="mb-0">
              Search parameters <i class="fa fa-angle-down rotate-icon"></i>
            </h5>
          </a>
        </div>

        <div id="collapseOne" class="collapse show" role="tabpanel" aria-labelledby="headingOne">
          <div class="card-body collapse-spacing">
            <div class="row">
              <div class="col-md-3">
                <h5>Research type</h5>

                <div class="form-group">
                  <input name="researchType" type="radio" class="with-gap" id="radioArtistType" value="0" v-model="searchType">
                  <label for="radioArtistType">Artists</label>
                </div>

                <div class="form-group">
                  <input name="researchType" type="radio" class="with-gap" id="radioAlbumType" value="1" v-model="searchType">
                  <label for="radioAlbumType">Albums</label>
                </div>

                <div class="form-group">
                  <input name="researchType" type="radio" class="with-gap" id="radioSongType" value="2" v-model="searchType">
                  <label for="radioSongType">Songs</label>
                </div>

                <div class="form-group">
                  <input name="researchType" type="radio" class="with-gap" id="radioUserType" value="3" v-model="searchType">
                  <label for="radioUserType">Users</label>
                </div>
              </div>
              <div class="col-md">
                <div class="md-form">
                  <input id="specificResearchTextInput" class="form-control" type="text" v-model="searchText" v-on:keyup="keypressed">
                  <label for="specificResearchTextInput">Search</label>
                </div>
                <div class="md-form float-right">
                  <a class="btn btn-light-blue waves-effect waves-light btn-lg" v-on:click="research()">Research</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ul class="nav nav-tabs nav-justified bg-light-blue">
      <li class="nav-item" v-if="searchTypeRequested == -1">
        <a class="white-text">No specific request have been sent</a>
      </li>
      <li class="nav-item" v-if="searchTypeRequested == 0">
        <a class="white-text">Artists corresponding to the following request : "{{searchTextRequested}}"</a>
      </li>
      <li class="nav-item" v-if="searchTypeRequested == 1">
        <a class="white-text">Albums corresponding to the following request : "{{searchTextRequested}}"</a>
      </li>
      <li class="nav-item" v-if="searchTypeRequested == 2">
        <a class="white-text">Songs corresponding to the following request : "{{searchTextRequested}}"</a>
      </li>
      <li class="nav-item" v-if="searchTypeRequested == 3">
        <a class="white-text">Users corresponding to the following request : "{{searchTextRequested}}"</a>
      </li>
    </ul>

    <div class="tab-content card mb-4">

      <div class="tab-pane fade in show active" v-if="searchTypeRequested == 0">
        <table class="table text-center" id="table-list-all-artists">
          <tbody v-for="(item, index) in artists">
          <tr v-if="index < indexPageArtist + displayNumbers && index >=  indexPageArtist">
            <th scope="row" class="align-middle"><img v-bind:id="item.artistId" v-bind:src="artworkUrl[index]" class="img-fluid table-icon" alt="artist picture"></th>
            <td class="align-middle">{{ item.artistName }}</td>
            <td class="align-middle light-blue-text"><em>{{ item.primaryGenreName }}</em></td>
            <td class="align-middle">
              <a class="btn btn-light-blue waves-effect waves-light btn-sm" v-bind:href="'./#/artist/'+item.artistId"><i class="fa fa-search mr-1"></i>See more</a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="tab-pane fade in show active" v-if="searchTypeRequested == 1">
        <table class="table text-center" id="table-list-all-albums">
          <tbody v-for="(item, index) in albums">
          <tr v-if="index < indexPageAlbum + displayNumbers && index >=  indexPageAlbum">
            <th scope="row" class="align-middle"><img v-bind:src="item.artworkUrl100" class="img-fluid table-icon" alt="album picture"></th>
            <td class="align-middle"><strong>{{ item.collectionName }}</strong></td>
            <td class="align-middle">{{ item.artistName }}</td>
            <td class="align-middle"><a class="btn btn-light-blue waves-effect waves-light btn-sm" v-bind:href="'./#/album/'+item.collectionId"><i class="fa fa-search mr-1"></i>See more</a></td>
            <td class="align-middle">
              <button type="button" v-on:click="addAllAlbumTracks(albums[index])" v-bind:disabled="playlists.length <= 0" class="btn btn-light-blue waves-effect waves-light btn-sm" data-toggle="modal" data-target="#addToPlaylistModal">
                Add all tracks in playlist
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="tab-pane fade in show active" v-if="searchTypeRequested == 2">
        <table class="table text-center" id="table-list-all-songs">
          <tbody v-for="(item, index) in songs">
          <tr v-if="index < indexPageSongs + displayNumbers && index >=  indexPageSongs">
            <th scope="row" class="align-middle"><img v-bind:src="item.artworkUrl100" class="img-fluid table-icon" alt="song picture"></th>
            <td class="align-middle"><strong>{{ item.trackName }}</strong></td>
            <td class="align-middle">{{ item.artistName }}</td>
            <td class="align-middle light-blue-text"><em>{{ item.primaryGenreName }}</em></td>
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

      <div class="tab-pane fade in show active" v-if="searchTypeRequested == 3">
        <table class="table text-center" id="table-list-all-users">
          <tbody v-for="(item, index) in users">
          <tr v-if="index < indexPageUsers + displayNumbers && index >=  indexPageUsers">
            <td class="align-middle"><strong>{{ item.name }}</strong></td>
            <td class="align-middle">{{ item.email }}</td>
            <td class="align-middle">
              <a class="btn btn-light-blue waves-effect waves-light btn-sm" v-bind:href="'./#/user/'+item.id"><i class="fa fa-search mr-1"></i>See more</a>
            </td>
            <td v-if="!isUser[index]">
              <button type="button" class="btn btn-sm btn-light-blue waves-effect waves-light" v-if="!isFollowingUser[index] && isFollowingUser[index]!==undefined" v-on:click="followUser(item,index)">
                Follow
                <i class="fa fa-user-plus fa-lg" aria-hidden="true"></i>
              </button>
              <button type="button" class="btn btn-sm btn-orange waves-effect waves-light" v-if="isFollowingUser[index] && isFollowingUser[index] !== undefined" v-on:click="unfollowUser(item,index)">
                Following
                <i class="fa fa-check fa-lg"></i>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="d-flex justify-content-center" v-if="searchTypeRequested != -1">
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

    <!-- audio -->
    <audio class="audio-playlist animated fadeIn" id="audio" autoplay controls ref="audio" v-on:ended="stopSong" v-bind:style=audioVisible></audio>

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
        artworkUrl: [],
        indexPageAlbum: 0,
        indexPageArtist: 0,
        indexPageSongs: 0,
        indexPageUsers: 0,
        displayNumbers: 5,
        searchType: '-1',
        searchText: '',
        searchTypeRequested: '-1',
        searchTextRequested: '',
        tracksToAdd: [],
        allAlbumTracks: [],
        selectedPlaylistIdx: 0,
        playlists: [],
        artists: [],
        albums: [],
        songs: [],
        users: [],
        currentUserId: '',
        currentUser: undefined,
        isUser: [],
        isFollowingUser: [],
        indexSongPlaying: undefined,
        audioVisible: 'display: none'
      };
    },
    beforeCreate: function beforeCreate() {
      api.checkPrivileges();
    },
    created: async function created() {
      this.getUser();
    },
    methods: {
      nextPage: function nextPage() {
        if (this.indexPageAlbum + this.displayNumbers < this.albums.length) {
          this.indexPageAlbum += this.displayNumbers;
        }
        if (this.indexPageArtist + this.displayNumbers < this.artists.length) {
          this.indexPageArtist += this.displayNumbers;
        }
        if (this.indexPageSongs + this.displayNumbers < this.songs.length) {
          this.indexPageSongs += this.displayNumbers;
        }
        if (this.indexPageUsers + this.displayNumbers < this.users.length) {
          this.indexPageUsers += this.displayNumbers;
        }
      },
      previousPage: function nextPage() {
        if (this.indexPageAlbum - this.displayNumbers >= 0) {
          this.indexPageAlbum -= this.displayNumbers;
        }
        if (this.indexPageArtist - this.displayNumbers >= 0) {
          this.indexPageArtist -= this.displayNumbers;
        }
        if (this.indexPageSongs - this.displayNumbers >= 0) {
          this.indexPageSongs -= this.displayNumbers;
        }
        if (this.indexPageUsers - this.displayNumbers >= 0) {
          this.indexPageUsers -= this.displayNumbers;
        }
      },
      getArtworkImg: async function getArtworkImg(artist, index) {
        const artwork = await api.getImageArtist(artist.artistLinkUrl);
        this.artworkUrl.splice(index, 1, artwork);
      },
      playSong: function playSong(song, index) {
        this.audioVisible = 'display: ';
        this.indexSongPlaying = index;
        this.$refs.audio.src = song;
        this.$refs.audio.play();
      },
      stopSong: function stopSong() {
        this.$refs.audio.src = '';
        this.indexSongPlaying = -1;
        this.audioVisible = 'display: none';
      },
      research: async function research() {
        this.songs = [];
        this.albums = [];
        this.artists = [];
        this.users = [];
        this.indexPageAlbum = 0;
        this.indexPageArtist = 0;
        this.indexPageSongs = 0;
        this.indexPageUsers = 0;

        try {
          switch (this.searchType) {
            case '0': {
              const artistsResults = await api.searchArtists(this.searchText);
              artistsResults.forEach((item) => {
                this.artworkUrl.push('http://thinkfuture.com/wp-content/uploads/2013/10/loading_spinner.gif');
                this.artists.push(item);
                this.getArtworkImg(item, this.artworkUrl.length - 1);
              });
              break;
            }
            case '1': {
              const albumsResults = await api.searchAlbums(this.searchText);
              albumsResults.forEach((item) => {
                this.albums.push(item);
              });
              break;
            }
            case '2': {
              const songsResults = await api.searchTracks(this.searchText);
              songsResults.forEach((item) => {
                this.songs.push(item);
              });
              break;
            }
            case '3': {
              const usersResults = await api.searchUsers(this.searchText);
              usersResults.forEach((item) => {
                this.users.push(item);

                if (this.isTheUser(item)) {
                  this.isUser.push(true);
                } else {
                  this.isUser.push(false);
                }

                if (this.isFollowingTheUser(item)) {
                  this.isFollowingUser.push(true);
                } else {
                  this.isFollowingUser.push(false);
                }
              });

              break;
            }
            default:
              break;
          }
        } catch (err) {
          this.errorMessage = err.message;
          this.showErrorHandler = true;
        }

        this.searchTypeRequested = this.searchType;
        this.searchTextRequested = this.searchText;
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
      followUser: async function followUser(user, index) {
        try {
          await api.followUser(user.id)
            .then(() => {
              this.getUser();
              this.isFollowingUser.splice(index, 1, true);
            });
        } catch (err) {
          this.errorMessage = err.message;
          this.showErrorHandler = true;
        }
      },
      unfollowUser: async function unfollowUser(user, index) {
        try {
          await api.unfollowUser(this.currentUser, user.email)
            .then(() => {
              this.getUser();
              this.isFollowingUser.splice(index, 1, false);
            });
        } catch (err) {
          this.errorMessage = err.message;
          this.showErrorHandler = true;
        }
      },
      isFollowingTheUser: function isFollowingTheUser(user) {
        for (let i = 0; i < this.currentUser.following.length; i += 1) {
          if (this.currentUser.following[i].email === user.email) {
            return true;
          }
        }
        return false;
      },
      isTheUser: function isTheUser(user) {
        if (this.currentUserId === user.id) {
          return true;
        }
        return false;
      },
      getUser: async function getUser() {
        try {
          this.currentUserId = await api.getCurrentUserId();
          this.currentUser = await api.getUser(this.currentUserId);
          const playlists = await api.getPlaylists(this.currentUserId);
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
      keypressed(event) {
        if (event.keyCode === 13 && this.searchType !== -1 && this.searchText !== '') {
          this.research();
        }
        return false;
      }
    }
  };
</script>
