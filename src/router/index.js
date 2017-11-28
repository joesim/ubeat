import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Album from '@/components/Album';
import Artist from '@/components/Artist';
import Settings from '@/components/Settings';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import Playlists from '@/components/Playlists';
import Playlist from '@/components/Playlist';
import User from '@/components/User';
import GlobalResearch from '@/components/GlobalResearch';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    }, {
      path: '/artist/:id',
      name: 'Artist',
      component: Artist
    }, {
      path: '/album/:id',
      name: 'Album',
      component: Album
    }, {
      path: '/settings',
      name: 'Settings',
      component: Settings
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }, {
      path: '/playlists',
      name: 'Playlists',
      component: Playlists
    }, {
      path: '/playlists/:id',
      name: 'Playlist',
      component: Playlist
    }, {
      path: '/user/:id',
      name: 'User',
      component: User
    }, {
      path: '/globalresearch/:search',
      name: 'GlobalResearch',
      component: GlobalResearch,
      props: true
    }
  ],
});
