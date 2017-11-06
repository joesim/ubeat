<template>
    <div class="container">
        <h1> Playlists <hr></h1>
        <div class="row">
            <div class="col-6 col-lg-4 col-md-6 col-sm-6" v-for="playlist of playlists" v-if="playlists.length>0">
                <a v-bind:href="`/#/playlists/${playlist.id}`">
                    <div class="card" style="margin:5px;">
                        <div class="row align-items-center" style="padding:3px">
                            <div class="col-md-4">
                                <img class="img-fluid" style="height:100px" :src="playlist.tracks[0].artworkUrl100" v-if="playlist.tracks.length!=0">
                                <img class="img-fluid" style="height:100px;" src="http://www.iconarchive.com/download/i7804/hopstarter/sleek-xp-software/VLC-Media-Player.ico" v-if="playlist.tracks.length==0">
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
    </div>
</template>

<script>
import Vue from 'vue';

export default {
  data() {
    return {
      playlists: [],
      errors: []
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
        if (data[i].owner !== undefined && data[i].owner.name !== undefined &&
         data[i].owner.email !== undefined) {
          this.playlists.push(data[i]);
        }
      }
    })
    .catch((error) => {
      this.error.push(error);
    });
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

