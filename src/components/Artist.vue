<template>
  <div class="container content">
    <div class="row">
      <div class="col-md-12">
        <h2>{{ name }}</h2>
        <h3 class="light-blue-text"><em>{{ genre }}</em></h3>
        <div class="row">
          <div class="col-md-3">
             <a v-bind:href="itunesLink" target="_blank" class="hoverable rounded itunes"></a>
          </div>
        </div>
      </div>
    </div>
    <div class="card mt-4 mb-4 animated fadeIn">
      <div class="card-body">
        <table class="table table-hover">
          <thead>
          <tr class="light-blue-text">
            <th>#</th>
            <th>Album</th>
            <th>Date</th>
            <th>Tracks</th>
            <th>Price</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(album, key, index) in albumsFiltered" v-on:click="redirectAlbum(album.collectionId)">
            <th scope="row">{{ key + 1 }}</th>
            <td>{{ album.collectionName }}</td>
            <td>{{ album.releaseDate }}</td>
            <td>{{ album.trackCount }}</td>
            <td>{{ album.collectionPrice }}</td>
          </tr>
          </tbody>
        </table>
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
      errorMessage: '',
      showErrorHandler: false,
      name: '',
      genre: '',
      itunesLink: '',
      albums: []
    };
  },
  created: async function created() {
    const artistId = this.$route.params.id;
    try {
      const data = await api.getArtist(artistId);
      const artist = data.results[0];
      this.name = artist.artistName;
      this.genre = artist.primaryGenreName;
      this.itunesLink = artist.artistLinkUrl;
    } catch (err) {
      this.errorMessage = err.message;
      this.showErrorHandler = true;
    }
    try {
      const data = await api.getAlbumFromArtist(artistId);
      this.albums = data.results;
      this.albums.sort((a, b) => parseInt(b.releaseDate, 10) - parseInt(a.releaseDate, 10));
      console.log(this.albums);
    } catch (err) {
      this.errorMessage = err.message;
      this.showErrorHandler = true;
    }
  },
  computed: {
    albumsFiltered: function albumsFiltered() {
      return this.albums.filter((album) => {
        const albumFiltered = album;
        albumFiltered.releaseDate = album.releaseDate.substr(0, 4);
        return albumFiltered;
      });
    }
  },
  methods: {
    redirectAlbum: (nav) => {
      document.location = `./#/album/${nav}`;
    }
  }
};
</script>
