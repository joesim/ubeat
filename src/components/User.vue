<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3 text-center">
                <gravatar email="jeanpaul@gmail.com" :size="200" />
            </div>
            <div class="col-md-9 text-center text-xs-center text-md-center text-lg-left">
                <h1 class="user-follow">
                    Jean Paul &nbsp;
                    <button type="button" class="btn btn-primary waves-effect waves-light">
                        Follow
                        <i class="fa fa-user-plus fa-lg" aria-hidden="true"></i>
                    </button>
                </h1>
                <h5 style="margin-top: 20px;">loremipsum@hotmail.com</h5>
                <p>
                    <strong>320</strong> playlists &emsp;
                    <strong>234</strong> following</p>
            </div>
        </div>
        <div class="card card-user">
            <div class="card-header">
                <ul class="nav card-header-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">
                            <i class="fa fa-list-ul"></i> Playlists
                            <span class="badge badge-pill badge-primary">320</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">
                            <i class="fa fa-user"></i> Following
                            <span class="badge badge-pill badge-primary">234</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="card-block card-playlist-user">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <playlists></playlists>
                </div>
                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                </div>
            </div>
        </div>

    </div>
</template>

<script>
import Gravatar from 'vue-gravatar';
import Playlists from './Playlists';

export default {
  components: {
    Playlists,
    Gravatar
  }
};
</script>

<style>
.avatar {
    margin: auto;
}

.nav-link {
    border: 1px solid transparent;
    border-top-left-radius: .25rem;
    border-top-right-radius: .25rem;
    display: block;
    padding: .5rem 1rem;
    font-size: 17px;
}

.nav-link.active {
    color: #495057;
    background-color: #fff;
    border-color: #ddd #ddd #fff;
    border-bottom: 3px solid white;
}

.nav-link.active .badge {
    color: #495057;
    background-color: #fff;
    border-color: #ddd #ddd #fff;
}

.card-user {
    margin: 30px 0 30px 0;
}

.card-playlist-user {
    margin: 10px;
}

.user-follow {
    display: inline-block;
    margin-right: 0px;
    padding-top: 10px;
}
</style>
