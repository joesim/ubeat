<template>

  <nav class="navbar navbar-expand-lg navbar-dark rouge-bordeau">
    <div class="container">
      <a class="navbar-brand" href="#">UBeat</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link waves-effect waves-light" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link waves-effect waves-light" to="/album">Album</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link waves-effect waves-light" to="/artist">Artist</router-link>
          </li>
        </ul>
        <form class="form-inline waves-effect waves-light">
          <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
        </form>
      </div>
    </div>
  </nav>

</template>

<style>
</style>
