<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3 hm-black-strong">
        <a href="https://geo.itunes.apple.com/ca/album/xscape-deluxe/id850697616?mt=1&app=music" target="_blank">
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
        <a href="./#/artist"><h2 class="black-text">{{ artistName }}</h2></a>
        <h3 class="light-blue-text">
          <em>{{ primaryGenreName }}</em>
        </h3>
        <div class="row">
          <div class="col">
            <p>{{ releaseDate }} <br> {{ numberTracks }} tracks</p>
          </div>
          <div class="col">
            <a href="https://geo.itunes.apple.com/ca/album/xscape-deluxe/id850697616?mt=1&app=music" target="_blank" class="hoverable rounded" style="display:inline-block;overflow:hidden;background:url(//linkmaker.itunes.apple.com/assets/shared/badges/en-us/music-lrg.svg) no-repeat;width:110px;height:40px;background-size:contain;"></a>
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
          <tbody>
          <tr>
            <th scope="row" class="align-middle">1</th>
            <td class="align-middle">Love Never Felt So Good</td>
            <td class="align-middle">3:54</td>
            <td>
              <button class="btn btn-light-blue waves-effect waves-light">
                <i class="fa fa-caret-right mr-1"></i> Play</button>
            </td>
          </tr>
          <tr>
            <th scope="row" class="align-middle">2</th>
            <td class="align-middle">Chicago</td>
            <td class="align-middle">4:05</td>
            <td>
              <button class="btn btn-light-blue waves-effect waves-light">
                <i class="fa fa-caret-right mr-1"></i> Play</button>
            </td>
          </tr>
          <tr>
            <th scope="row" class="align-middle">3</th>
            <td class="align-middle">Loving You</td>
            <td class="align-middle">3:15</td>
            <td>
              <button class="btn btn-light-blue waves-effect waves-light">
                <i class="fa fa-caret-right mr-1"></i> Play</button>
            </td>
          </tr>
          <tr>
            <th scope="row" class="align-middle">4</th>
            <td class="align-middle">A Place with No Name</td>
            <td class="align-middle">5:35</td>
            <td>
              <button class="btn btn-light-blue waves-effect waves-light">
                <i class="fa fa-caret-right mr-1"></i> Play</button>
            </td>
          </tr><tr>
            <th scope="row" class="align-middle">5</th>
            <td class="align-middle">Slave to the Rhythm</td>
            <td class="align-middle">4:15</td>
            <td>
              <button class="btn btn-light-blue waves-effect waves-light">
                <i class="fa fa-caret-right mr-1"></i> Play</button>
            </td>
          </tr><tr>
            <th scope="row" class="align-middle">6</th>
            <td class="align-middle">Do You Know Where Your Children Are</td>
            <td class="align-middle">4:36</td>
            <td>
              <button class="btn btn-light-blue waves-effect waves-light">
                <i class="fa fa-caret-right mr-1"></i> Play</button>
            </td>
          </tr><tr>
            <th scope="row" class="align-middle">7</th>
            <td class="align-middle">Blue Gangsta</td>
            <td class="align-middle">4:14</td>
            <td>
              <button class="btn btn-light-blue waves-effect waves-light">
                <i class="fa fa-caret-right mr-1"></i> Play</button>
            </td>
          </tr><tr>
            <th scope="row" class="align-middle">8</th>
            <td class="align-middle">Xscape</td>
            <td class="align-middle">4:04</td>
            <td>
              <button class="btn btn-light-blue waves-effect waves-light">
                <i class="fa fa-caret-right mr-1"></i> Play</button>
            </td>
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
        artistName: '',
        collectionName: '',
        primaryGenreName: '',
        releaseDate: '',
        artworkUrl: '',
        collectionUrl: '',
        numberTracks: 0,
        tracks: []
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
        })
        .catch((err) => {
          console.log(err);
        });

      const reqLocTracks = `${Vue.config.ubeatApiLocation}/albums/${albumId}/tracks`;

      fetch(new Request(reqLocTracks, { method: 'GET', headers: reqHeaders }))
        .then(resp => resp.json())
        .then((data) => {
          this.tracks = data.results;
          this.numberTracks = this.tracks.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
</script>

<style>

</style>
