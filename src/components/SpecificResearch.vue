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
                  <input name="researchType" type="radio" class="with-gap" id="radioTrackType" value="2" v-model="searchType">
                  <label for="radioTrackType">Tracks</label>
                </div>

                <div class="form-group">
                  <input name="researchType" type="radio" class="with-gap" id="radioUserType" value="3" v-model="searchType">
                  <label for="radioUserType">Users</label>
                </div>
              </div>
              <div class="col-md-9">
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
        <a class="white-text">Artists corresponding to the following request : "{{searchText}}"</a>
      </li>
      <li class="nav-item" v-if="searchTypeRequested == 1">
        <a class="white-text">Albums corresponding to the following request : "{{searchText}}"</a>
      </li>
      <li class="nav-item" v-if="searchTypeRequested == 2">
        <a class="white-text">Songs corresponding to the following request : "{{searchText}}"</a>
      </li>
      <li class="nav-item" v-if="searchTypeRequested == 3">
        <a class="white-text">Users corresponding to the following request : "{{searchText}}"</a>
      </li>
    </ul>

    <div class="tab-content card mb-4">

      <div class="tab-pane fade in show active" v-if="searchTypeRequested == 0">
        <table class="table text-center" id="table-list-all-artists">
          <tbody v-for="(item, index) in artists">
          <tr v-if="index < indexPageArtist + 3 && index >=  indexPageArtist">
            <td class="align-middle"><strong>{{ item.artistName }}</strong></td>
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
          <tr v-if="index < indexPageAlbum + 3 && index >=  indexPageAlbum">
            <th scope="row" class="align-middle"><img v-bind:src="item.artworkUrl100" class="img-fluid table-icon" alt="album picture"></th>
            <td class="align-middle"><strong>{{ item.collectionName }}</strong></td>
            <td class="align-middle">{{ item.artistName }}</td>
            <td class="align-middle"><a class="btn btn-light-blue waves-effect waves-light btn-sm" v-bind:href="'./#/album/'+item.collectionId"><i class="fa fa-search mr-1"></i>See more</a></td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="tab-pane fade in show active" v-if="searchTypeRequested == 2">
        <table class="table text-center" id="table-list-all-songs">
          <tbody v-for="(item, index) in songs">
          <tr v-if="index < indexPageSongs + 3 && index >=  indexPageSongs">
            <th scope="row" class="align-middle"><img v-bind:src="item.artworkUrl100" class="img-fluid table-icon" alt="song picture"></th>
            <td class="align-middle"><strong>{{ item.trackName }}</strong></td>
            <td class="align-middle">{{ item.artistName }}</td>
            <td class="align-middle light-blue-text"><em>{{ item.primaryGenreName }}</em></td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="tab-pane fade in show active" v-if="searchTypeRequested == 3">
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
        searchType: '-1',
        searchText: '',
        searchTypeRequested: '-1',
        searchTextRequested: '',
        artists: [],
        albums: [],
        songs: [],
        users: []
      };
    },
    beforeCreate: function beforeCreate() {
      api.checkPrivileges();
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
        this.indexPageAlbum = 0;
        this.indexPageArtist = 0;
        this.indexPageSongs = 0;
        this.indexPageUsers = 0;

        try {
          switch (this.searchType) {
            case '0': {
              const artistsResults = await api.searchArtists(this.searchText);
              artistsResults.forEach((item) => {
                this.artists.push(item);
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
              const tracksResults = await api.searchTracks(this.searchText);
              tracksResults.forEach((item) => {
                this.tracks.push(item);
              });
              break;
            }
            case '3': {
              const usersResults = await api.searchUsers(this.searchText);
              usersResults.forEach((item) => {
                this.users.push(item);
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
      keypressed(event) {
        if (event.keyCode === 13 && this.searchType !== -1 && this.searchText !== '') {
          this.research();
        }
        return false;
      },
    }
  };
</script>
