<template>
    <div class="container">
      <div class="card-body">
        <h1 class="light-blue-text text-center">My music, my rhythm!</h1>
        <br/>
        <p class="text-justify">Welcome to the
          <b>most musical</b> website on the Internet! You love music and would like to have a tool that allows you to
          <b>create</b> and
          <b>share</b> to your friends
          <b>your custom music compilations</b>, then this site is what you are looking for. To get an idea of the various artists and albums available on the website, you can look in the section below or use the search tool located in the menu bar. Do not hesitate to register now and good music listening!</p>
        <br/>
        <h3 class="text-center">Here are some random albums & artists to discover, enjoy!</h3>
      </div>

      <ul class="nav nav-tabs nav-justified bg-light-blue">
        <li class="nav-item">
          <a class="nav-link active" v-on:click="indexPageAlbum = 0" data-toggle="tab" href="#panel1" role="tab">Albums</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" v-on:click="indexPageArtist = 0"  data-toggle="tab" href="#panel2" role="tab">Artists</a>
        </li>
      </ul>

      <div class="tab-content card mb-4">

        <div class="tab-pane fade in show active" id="panel1" role="tabpanel">
          <table class="table text-center" id="table-list-all-albums">
            <tbody v-for="(item, index) in albums">
            <tr v-if="index < indexPageAlbum + 3 && index >=  indexPageAlbum">
              <th scope="row" class="align-middle"><img v-bind:src="item.artworkUrl100" class="img-fluid table-icon" alt="album picture"></th>
              <td class="align-middle">{{ item.collectionName }}</td>
              <td class="align-middle"><a class="btn btn-light-blue waves-effect waves-light btn-sm" v-bind:href="'./#/album/'+item.collectionId"><i class="fa fa-search mr-1"></i>See more</a></td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="tab-pane fade" id="panel2" role="tabpanel">
          <table class="table text-center" id="table-list-all-artists">
            <tbody v-for="(item, index) in artists">
              <tr v-if="index < indexPageArtist + 3 && index >=  indexPageArtist">
                <td class="align-middle">{{ item.artistName }}</td>
                <td class="align-middle light-blue-text"><em>{{ item.primaryGenreName }}</em></td>
                <td class="align-middle">
                  <a class="btn btn-light-blue waves-effect waves-light btn-sm" v-bind:href="'./#/artist/'+item.artistId"><i class="fa fa-search mr-1"></i>See more</a>
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
        artists: [],
        albums: []
      };
    },
    beforeCreate: function beforeCreate() {
      api.checkPrivileges();
    },
    created: async function created() {
      const character = Math.random().toString(36).substring(2, 3);

      try {
        this.artists = await api.searchArtists(character);
        this.albums = await api.searchAlbums(character);
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
      },
      previousPage: function nextPage() {
        if (this.indexPageAlbum - 3 >= 0) {
          this.indexPageAlbum -= 3;
        }
        if (this.indexPageArtist - 3 >= 0) {
          this.indexPageArtist -= 3;
        }
      }
    }
  };
</script>
