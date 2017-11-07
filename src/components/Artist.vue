<template>
  <div class="container content">
    <div class="row">
      <div class="col-md-12">
        <h2>{{ name }}</h2>
        <h3 class="light-blue-text"><em>{{ genre }}</em></h3>
        <div class="row">
          <div class="col-md-3">
             <a v-bind:href="itunesLink" target="_blank" class="hoverable rounded" style="display:inline-block;overflow:hidden;background:url(//linkmaker.itunes.apple.com/assets/shared/badges/en-us/music-lrg.svg) no-repeat;width:110px;height:40px;background-size:contain;"></a>
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
            <th>Duration</th>
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
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  data() {
    return {
      name: '',
      genre: '',
      itunesLink: '',
      albums: []
    };
  },
  created: async function created() {
    const reqHeaders = new Headers({
      Authorization: Vue.config.ubeatToken,
    });

    const artistId = this.$route.params.id;

    const reqLoc = `${Vue.config.ubeatApiLocation}/artists/${artistId}`;

    fetch(new Request(reqLoc, { method: 'GET', headers: reqHeaders }))
    .then(resp => resp.json())
    .then((data) => {
      const artist = data.results[0];
      this.name = artist.artistName;
      this.genre = artist.primaryGenreName;
      this.itunesLink = artist.artistLinkUrl;
    });

    const reqLocAlbums = `${Vue.config.ubeatApiLocation}/artists/${artistId}/albums`;

    fetch(new Request(reqLocAlbums, { method: 'GET', headers: reqHeaders }))
    .then(resp => resp.json())
    .then((data) => {
      this.albums = data.results;
    });
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

<style>
  .table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
    background-color: RGB(130,177,255);
    color: white;
    cursor: pointer;
  }
</style>
