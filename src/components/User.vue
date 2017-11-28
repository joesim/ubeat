<template>
    <div class="container" v-if="user!==undefined && isFollowingUser!==undefined">
        <div class="row">
            <div class="col-md-3 text-center text-md-left">
                <gravatar :email="user.email" :size="200" />
            </div>
            <div class="col-md-9 text-center text-xs-center text-md-center text-lg-left">
                <h1 class="user-follow">
                    {{user.name}} &nbsp;
                    <button type="button" class="btn btn-primary waves-effect waves-light" v-if="!isUser && !isFollowingUser" v-on:click="followUser()">
                        Follow
                        <i class="fa fa-user-plus fa-lg" aria-hidden="true"></i>
                    </button>
                    <button type="button" class="btn btn-orange waves-effect waves-light" v-if="!isUser && isFollowingUser" v-on:click="unfollowUser()">
                        Following
                        <i class="fa fa-check fa-lg"></i>
                    </button>
                </h1>
                <h5 style="margin-top: 20px;">{{user.email}}</h5>
                <p>
                    <strong>{{playlists.length}}</strong> playlists &emsp;
                    <strong>{{user.following.length}}</strong> following</p>
            </div>
        </div>
        <div class="card card-user">
            <div class="card-header">
                <ul class="nav card-header-tabs">
                    <li>
                        <a v-on:click="openPlaylists()" class="nav-link active" id="playlists-tab" data-toggle="tab" href="#playlists" >
                            <i class="fa fa-list-ul"></i> Playlists
                            <span class="badge badge-pill badge-primary">{{playlists.length}}</span>
                        </a>
                    </li>
                    <li>
                        <a v-on:click="openFollowing()" class="nav-link" id="following-tab" data-toggle="tab" href="#following">
                            <i class="fa fa-users" aria-hidden="true"></i> Following
                            <span class="badge badge-pill badge-primary">{{user.following.length}}</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="card-block card-playlist-user">
                <div class="tab-pane show active" ref="playlistsCard" id="playlists" role="tabpanel">
                    <playlists :isUser="isUser" :playlists="playlists"></playlists>
                </div>
                <div class="tab-pane tabNothing" id="following" ref="followingCard" role="tabpanel">
                    <following :users="users" :followings="user.following"></following>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Gravatar from 'vue-gravatar';
import Playlists from './Playlists';
import Following from './Following';
import api from '../api';

export default {
  components: {
    Playlists,
    Gravatar,
    Following
  },
  data() {
    return {
      playlists: [],
      isUser: false,
      user: undefined,
      users: [],
      currentUser: undefined,
      showErrorHandler: false,
      errorMessage: '',
      isFollowingUser: undefined
    };
  },
  created: async function created() {
    this.fetchAllData(this.$route.params.id);
  },
  methods: {
    fetchAllData: async function fetchAllData(userId) {
      try {
        const currentUserId = await api.getCurrentUserId();
        this.isUser = (userId === currentUserId);
        Promise.all([api.getAllUsers(), api.getUser(userId), api.getPlaylists(userId),
          api.getUser(currentUserId)])
         .then(([allUsers, user, playlists, currentUser]) => {
           this.users = allUsers;
           this.user = user;
           this.playlists = playlists;
           this.currentUser = currentUser;
           this.isFollowingTheUser();
         });
      } catch (err) {
        this.errorMessage = err.message;
        this.showErrorHandler = true;
      }
    },
    followUser: async function followUser() {
      try {
        await api.followUser(this.user.id);
        this.isFollowingTheUser();
      } catch (err) {
        this.errorMessage = err.message;
        this.showErrorHandler = true;
      }
    },
    unfollowUser: async function unfollowUser() {
      try {
        await api.unfollowUser(this.currentUser, this.user.email);
        this.isFollowingTheUser();
      } catch (err) {
        this.errorMessage = err.message;
        this.showErrorHandler = true;
      }
    },
    isFollowingTheUser: async function isFollowingUser() {
      this.currentUser = await api.getUser(this.currentUser.id);
      for (let i = 0; i < this.currentUser.following.length; i += 1) {
        if (this.currentUser.following[i].email === this.user.email) {
          this.isFollowingUser = true;
          return;
        }
      }
      this.isFollowingUser = false;
    },
    openFollowing: function openFollowing() {
      this.$refs.playlistsCard.style.display = 'none';
      this.$refs.followingCard.style.display = 'block';
    },
    openPlaylists: function openPlaylists() {
      this.$refs.playlistsCard.style.display = 'block';
      this.$refs.followingCard.style.display = 'none';
    }
  },
  beforeRouteUpdate: async function beforeRouteUpdate(to, from, next) {
    this.fetchAllData(to.params.id).then(() => { next(); });
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

.tabNothing {
    display: none;
}
</style>
