<template>

  <nav class="navbar navbar-expand-lg navbar-dark bg-light-blue fixed-top">
    <div class="container">
      <a class="navbar-brand waves-effect waves-light" v-on:click="redirectHome" ><img src="static/img/branding/brand.png" class="brand"></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link waves-effect waves-light" to="/playlists"><i class="fa fa-list-ul"></i> Playlists</router-link>
          </li>
        </ul>

        <ul class="navbar-nav mr-auto">
          <li class="nav-item navbar-search">
            <form class="form-inline waves-effect waves-light">
              <input class="form-control" type="text" placeholder="Search" aria-label="Search" v-model="searchText">
            </form>
          </li>
        </ul>

        <ul class="navbar-nav">
          <li class="nav-item dropdown show">
            <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
               aria-expanded="false"><i class="fa fa-user"></i> {{username}}</a>
            <div class="dropdown-menu dropdown-light-blue" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item waves-effect waves-light" v-on:click="redirectSettings"><i class="fa fa-gear"></i> Settings</a>
              <a class="dropdown-item aves-effect waves-light"><i class="fa fa-sign-out"></i> Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>
<script>
  export default {
    data() {
      return {
        username: '',
        searchText: ''
      };
    },
    created: async function created() {
      this.username = 'Username';
    },
    methods: {
      redirectHome: () => {
        document.location = './#/';
      },
      redirectSettings: () => {
        document.location = './#/settings/';
      },
      redirectSignup: () => {
        document.location = './#/signup';
      }
    }
  };
</script>

