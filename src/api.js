import Cookies from 'js-cookie';

let token;
const apiLocation = 'https://ubeat.herokuapp.com';

export default {
  checkPrivileges: function checkPrivileges() {
    const cookieToken = Cookies.get('token');
    if (cookieToken === undefined) {
      window.location = '/?#/login';
    } else {
      token = cookieToken;
    }
  },
  getAllUsers: function getAllUsers() {
    const reqHeaders = new Headers({ Authorization: token });
    const reqLocTok = `${apiLocation}/users`;
    return fetch(new Request(reqLocTok, {
      method: 'GET',
      headers: reqHeaders
    }))
      .then(resp => resp.json())
      .then(data => data)
      .catch(() => {
        throw new Error('Unable to get Users');
      });
  },
  followUser: function followUser(userId) {
    const reqHeaders = new Headers({
      Authorization: token,
      'Content-Type': 'application/json'
    });
    const reqLoc = `${apiLocation}/follow`;
    const reqBody = {
      id: userId
    };
    return fetch(new Request(reqLoc, { method: 'POST', headers: reqHeaders, body: JSON.stringify(reqBody) }))
      .then(resp => resp.json())
      .then(data => data)
      .catch(() => {
        throw new Error('Unable to follow user');
      });
  },
  unfollowUser: function unfollowUser(user, userEmail) {
    const reqHeaders = new Headers({ Authorization: token });
    let userToDeleteId;
    for (let i = 0; i < user.following.length; i += 1) {
      if (user.following[i].email === userEmail) {
        userToDeleteId = user.following[i]._id;
      }
    }
    const reqLoc = `${apiLocation}/follow/${userToDeleteId}`;
    return fetch(new Request(reqLoc, { method: 'DELETE', headers: reqHeaders }))
      .then(resp => resp.json())
      .then(() => undefined)
      .catch(() => {
        throw new Error('Unable to unfollow user');
      });
  },
  getUser: function getUser(userId) {
    const reqHeaders = new Headers({ Authorization: token });
    const reqLocTok = `${apiLocation}/users/${userId}`;
    return fetch(new Request(reqLocTok, {
      method: 'GET',
      headers: reqHeaders
    }))
      .then(resp => resp.json())
      .then(data => data)
      .catch(() => {
        throw new Error('Unable to get User');
      });
  },
  getCurrentUserId: function getCurrentUserId() {
    const reqHeaders = new Headers({ Authorization: token });
    const reqLocTok = `${apiLocation}/tokeninfo`;
    return fetch(new Request(reqLocTok, { method: 'GET', headers: reqHeaders }))
      .then(resp => resp.json())
      .then(data => data.id)
      .catch(() => {
        throw new Error('Unable to get current user Id');
      });
  },
  getPlaylists: function getPlaylists(userId) {
    const reqHeaders = new Headers({ Authorization: token });
    const reqLocTok = `${apiLocation}/playlists`;
    return fetch(new Request(reqLocTok, {
      method: 'GET',
      headers: reqHeaders
    }))
      .then(resp => resp.json())
      .then((data) => {
        if (userId !== undefined) {
          const playlistsUser = [];
          for (let i = 0; i < data.length; i += 1) {
            if (data[i].owner !== undefined &&
              data[i].owner.id === userId) {
              playlistsUser.push(data[i]);
            }
          }
          return playlistsUser;
        }
        return data;
      })
      .catch(() => {
        throw new Error('Unable to fetch playlists');
      });
  },
  createPlaylist: function createPlaylist(name) {
    const reqHeaders = new Headers({ Authorization: token });
    const reqBody = new URLSearchParams({
      name
    });
    const reqLoc = `${apiLocation}/playlists`;
    return fetch(new Request(reqLoc, { method: 'POST', headers: reqHeaders, body: reqBody }))
      .then(resp => resp.json())
      .then(data => data)
      .catch(() => {
        throw new Error('Unable to create playlist');
      });
  },
  getPlaylist: function getPlaylist(id) {
    const reqHeaders = new Headers({ Authorization: token });
    const reqLoc = `${apiLocation}/playlists/${id}`;
    return fetch(new Request(reqLoc, { method: 'GET', headers: reqHeaders }))
      .then(resp => resp.json())
      .then(data => data)
      .catch(() => {
        throw new Error('Unable to get playlist');
      });
  },
  deletePlaylist: function deletePlaylist(id) {
    const reqHeaders = new Headers({ Authorization: token });
    const reqLoc = `${apiLocation}/playlists/${id}`;
    return fetch(new Request(reqLoc, {
      method: 'DELETE',
      headers: reqHeaders
    }))
    .then(resp => resp.json())
    .then(() => undefined)
    .catch(() => {
      throw new Error('Unable to delete playlist');
    });
  },
  updatePlaylistName: function updatePlaylistName(playlist, id) {
    const reqHeaders = new Headers({ Authorization: token });
    const headersPut = new Headers(reqHeaders);
    headersPut.append('Content-Type', 'application/json');
    const reqBody = playlist;
    const reqLoc = `${apiLocation}/playlists/${id}`;
    return fetch(new Request(reqLoc, { method: 'PUT', headers: headersPut, body: reqBody }))
        .then(resp => resp.json())
        .then(data => data)
        .catch(() => {
          throw new Error('Unable to change playlist name');
        });
  },
  deleteSong: function deleteSong(playlistId, trackId) {
    const reqHeaders = new Headers({ Authorization: token });
    const reqLoc = `${apiLocation}/playlists/${playlistId}/tracks/${trackId}`;
    return fetch(new Request(reqLoc, { method: 'DELETE', headers: reqHeaders }))
      .then(resp => resp.json())
      .then(() => undefined)
      .catch(() => {
        throw new Error('Unable to delete song');
      });
  },
  getAlbum: function getAlbum(albumId) {
    const reqHeaders = new Headers({ Authorization: token });
    const reqLoc = `${apiLocation}/albums/${albumId}`;
    return fetch(new Request(reqLoc, { method: 'GET', headers: reqHeaders }))
      .then(resp => resp.json())
      .then(data => data)
      .catch(() => {
        throw new Error('Unable to get album');
      });
  },
  getTracksAlbum: function getTracksAlbum(albumId) {
    const reqHeaders = new Headers({ Authorization: token });
    const reqLocTracks = `${apiLocation}/albums/${albumId}/tracks`;
    return fetch(new Request(reqLocTracks, { method: 'GET', headers: reqHeaders }))
      .then(resp => resp.json())
      .then(data => data)
      .catch(() => {
        throw new Error('Unable to get tracks');
      });
  },
  addTrackToPlaylist: function addTrackToPlaylist(playlistId, tracks) {
    const reqHeaders = new Headers({ Authorization: token });
    const reqLocAdd = `${apiLocation}/playlists/${playlistId}/tracks`;
    tracks.forEach((track) => {
      const data = new URLSearchParams(track);
      fetch(new Request(reqLocAdd, { method: 'POST', headers: reqHeaders, body: data }))
          .then()
          .catch((err) => {
            throw new Error(err.message);
          });
    });
  },
  getArtist: function getArtist(artistId) {
    const reqHeaders = new Headers({ Authorization: token });
    const reqLoc = `${apiLocation}/artists/${artistId}`;
    return fetch(new Request(reqLoc, { method: 'GET', headers: reqHeaders }))
      .then(resp => resp.json())
      .then(data => data)
      .catch(() => {
        throw new Error('Unable to get an artist');
      });
  },
  getAlbumFromArtist: function getAlbumFromArtist(artistId) {
    const reqHeaders = new Headers({ Authorization: token });
    const reqLocAlbums = `${apiLocation}/artists/${artistId}/albums`;
    return fetch(new Request(reqLocAlbums, { method: 'GET', headers: reqHeaders }))
      .then(resp => resp.json())
      .then(data => data)
      .catch(() => {
        throw new Error('Unable to get albums');
      });
  },
  searchArtists: function searchArtists(str) {
    const reqHeaders = new Headers({ Authorization: token });
    const reqLocArtists = `${apiLocation}/search/artists?q=${str}`;
    return fetch(new Request(reqLocArtists, { method: 'GET', headers: reqHeaders }))
      .then(resp => resp.json())
      .then(data => data.results)
      .catch(() => {
        throw new Error('Unable to search an artist');
      });
  },
  searchAlbums: function searchAlbums(str) {
    const reqHeaders = new Headers({ Authorization: token });
    const reqLocAlbums = `${apiLocation}/search/albums?q=${str}`;
    return fetch(new Request(reqLocAlbums, { method: 'GET', headers: reqHeaders }))
      .then(resp => resp.json())
      .then(data => data.results)
      .catch(() => {
        throw new Error('Unable to search an album');
      });
  },
  searchTracks: function searchTracks(str) {
    const reqHeaders = new Headers({ Authorization: token });
    const reqLocTracks = `${apiLocation}/search/tracks?q=${str}`;
    return fetch(new Request(reqLocTracks, {
      method: 'GET',
      headers: reqHeaders
    }))
    .then(resp => resp.json())
    .then(data => data.results)
    .catch(() => {
      throw new Error('Unable to search tracks');
    });
  },
  searchUsers: function searchUsers(str) {
    const reqHeaders = new Headers({ Authorization: token });
    const reqLocUsers = `${apiLocation}/search/users?q=${str}`;
    return fetch(new Request(reqLocUsers, {
      method: 'GET',
      headers: reqHeaders
    }))
    .then(resp => resp.json())
    .then(data => data.results)
    .catch(() => {
      throw new Error('Unable to search users');
    });
  },
  search: function search(str) {
    const reqHeaders = new Headers({ Authorization: token });
    const reqLocUsers = `${apiLocation}/search?q=${str}&limit=20`;
    return fetch(new Request(reqLocUsers, {
      method: 'GET',
      headers: reqHeaders
    }))
      .then(resp => resp.json())
      .then(data => data.results)
      .catch(() => {
        throw new Error('Unable to search');
      });
  },
  signup: function signup(email, password, name) {
    const reqBody = new URLSearchParams({ name, password, email });
    const headersSignup = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const reqLoc = `${apiLocation}/signup`;
    return fetch(new Request(reqLoc, { method: 'POST', headers: headersSignup, body: reqBody }))
      .then(resp => resp.json())
      .then(data => data)
      .catch(() => {
        throw new Error('User already exists');
      });
  },
  login: function login(email, password) {
    const reqBody = new URLSearchParams({ email, password });
    const headersLogin = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const reqLoc = `${apiLocation}/login`;
    return fetch(new Request(reqLoc, { method: 'POST', headers: headersLogin, body: reqBody }))
      .then(resp => resp.json())
      .then(data => data)
      .catch(() => {
        throw new Error('Wrong login');
      });
  },
};
