import Vue from 'vue';

const reqHeaders = new Headers({
  Authorization: Vue.config.ubeatToken
});

export default {

  getAllUsers: function getAllUsers() {
    const reqLocTok = `${Vue.config.ubeatApiLocation}/users`;
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
    const headersFollow = new Headers(reqHeaders);
    headersFollow.append('Content-Type', 'application/json');
    const reqLoc = `${Vue.config.ubeatApiLocation}/follow`;
    const reqBody = {
      id: userId
    };
    return fetch(new Request(reqLoc, { method: 'POST', headers: headersFollow, body: JSON.stringify(reqBody) }))
      .then(resp => resp.json())
      .then(data => data)
      .catch(() => {
        throw new Error('Unable to follow user');
      });
  },
  unfollowUser: function unfollowUser(user, userEmail) {
    let userToDeleteId;
    for (let i = 0; i < user.following.length; i += 1) {
      if (user.following[i].email === userEmail) {
        userToDeleteId = user.following[i]._id;
      }
    }
    const reqLoc = `${Vue.config.ubeatApiLocation}/follow/${userToDeleteId}`;
    return fetch(new Request(reqLoc, { method: 'DELETE', headers: reqHeaders }))
      .then(resp => resp.json())
      .then(() => undefined)
      .catch(() => {
        throw new Error('Unable to unfollow user');
      });
  },
  getUser: function getUser(userId) {
    const reqLocTok = `${Vue.config.ubeatApiLocation}/users/${userId}`;
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
    const reqLocTok = `${Vue.config.ubeatApiLocation}/tokeninfo`;
    return fetch(new Request(reqLocTok, { method: 'GET', headers: reqHeaders }))
      .then(resp => resp.json())
      .then(data => data.id)
      .catch(() => {
        throw new Error('Unable to get current user Id');
      });
  },
  getPlaylists: function getPlaylists(userId) {
    const reqLocTok = `${Vue.config.ubeatApiLocation}/playlists`;
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
    const reqBody = new URLSearchParams({
      name
    });
    const reqLoc = `${Vue.config.ubeatApiLocation}/playlists`;
    return fetch(new Request(reqLoc, { method: 'POST', headers: reqHeaders, body: reqBody }))
      .then(resp => resp.json())
      .then(data => data)
      .catch(() => {
        throw new Error('Unable to create playlist');
      });
  },
  getPlaylist: function getPlaylist(id) {
    const reqLoc = `${Vue.config.ubeatApiLocation}/playlists/${id}`;
    return fetch(new Request(reqLoc, { method: 'GET', headers: reqHeaders }))
      .then(resp => resp.json())
      .then(data => data)
      .catch(() => {
        throw new Error('Unable to get playlist');
      });
  },
  deletePlaylist: function deletePlaylist(id) {
    const reqLoc = `${Vue.config.ubeatApiLocation}/playlists/${id}`;
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
    const headersPut = new Headers(reqHeaders);
    headersPut.append('Content-Type', 'application/json');
    const reqBody = playlist;
    const reqLoc = `${Vue.config.ubeatApiLocation}/playlists/${id}`;
    return fetch(new Request(reqLoc, { method: 'PUT', headers: headersPut, body: reqBody }))
        .then(resp => resp.json())
        .then(data => data)
        .catch(() => {
          throw new Error('Unable to change playlist name');
        });
  },
  deleteSong: function deleteSong(playlistId, trackId) {
    const reqLoc = `${Vue.config.ubeatApiLocation}/playlists/${playlistId}/tracks/${trackId}`;
    return fetch(new Request(reqLoc, { method: 'DELETE', headers: reqHeaders }))
      .then(resp => resp.json())
      .then(() => undefined)
      .catch(() => {
        throw new Error('Unable to delete song');
      });
  },
  getAlbum: function getAlbum(albumId) {
    const reqLoc = `${Vue.config.ubeatApiLocation}/albums/${albumId}`;
    return fetch(new Request(reqLoc, { method: 'GET', headers: reqHeaders }))
      .then(resp => resp.json())
      .then(data => data)
      .catch(() => {
        throw new Error('Unable to get album');
      });
  },
  getTracksAlbum: function getTracksAlbum(albumId) {
    const reqLocTracks = `${Vue.config.ubeatApiLocation}/albums/${albumId}/tracks`;
    return fetch(new Request(reqLocTracks, { method: 'GET', headers: reqHeaders }))
      .then(resp => resp.json())
      .then(data => data)
      .catch(() => {
        throw new Error('Unable to get tracks');
      });
  },
  addTrackToPlaylist: function addTrackToPlaylist(playlistId, tracks) {
    const reqLocAdd = `${Vue.config.ubeatApiLocation}/playlists/${playlistId}/tracks`;
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
    const reqLoc = `${Vue.config.ubeatApiLocation}/artists/${artistId}`;
    return fetch(new Request(reqLoc, { method: 'GET', headers: reqHeaders }))
      .then(resp => resp.json())
      .then(data => data)
      .catch(() => {
        throw new Error('Unable to get an artist');
      });
  },
  getAlbumFromArtist: function getAlbumFromArtist(artistId) {
    const reqLocAlbums = `${Vue.config.ubeatApiLocation}/artists/${artistId}/albums`;
    return fetch(new Request(reqLocAlbums, { method: 'GET', headers: reqHeaders }))
      .then(resp => resp.json())
      .then(data => data)
      .catch(() => {
        throw new Error('Unable to get albums');
      });
  },
  searchArtists: function searchArtists(str) {
    const reqLocArtists = `${Vue.config.ubeatApiLocation}/search/artists?q=${str}`;
    return fetch(new Request(reqLocArtists, { method: 'GET', headers: reqHeaders }))
      .then(resp => resp.json())
      .then(data => data.results)
      .catch(() => {
        throw new Error('Unable to search an artist');
      });
  },
  searchAlbums: function searchAlbums(str) {
    const reqLocAlbums = `${Vue.config.ubeatApiLocation}/search/albums?q=${str}`;
    return fetch(new Request(reqLocAlbums, { method: 'GET', headers: reqHeaders }))
      .then(resp => resp.json())
      .then(data => data.results)
      .catch(() => {
        throw new Error('Unable to search an album');
      });
  },
  searchTracks: function searchTracks(str) {
    const reqLocTracks = `${Vue.config.ubeatApiLocation}/search/tracks?q=${str}`;
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
    const reqLocUsers = `${Vue.config.ubeatApiLocation}/search/users?q=${str}`;
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
    const reqLocUsers = `${Vue.config.ubeatApiLocation}/search?q=${str}&limit=20`;
    return fetch(new Request(reqLocUsers, {
      method: 'GET',
      headers: reqHeaders
    }))
      .then(resp => resp.json())
      .then(data => data.results)
      .catch(() => {
        throw new Error('Unable to search');
      });
  }
};
