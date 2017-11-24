<template>
  <div class="container">
    <div class="card-body">
      <br/>
      <h3 class="text-center">Search results for: <strong>{{ this.$route.params.search }}</strong></h3>
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
            <td class="align-middle"><strong>{{ item.artistName }}</strong></td>
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
        users: []
      };
    },
    created: async function created() {
      const search = this.$route.params.search;

      try {
        const result = await api.search(search);
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
      }
    }
  };
</script>
