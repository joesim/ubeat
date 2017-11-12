import Vue from 'vue';

const reqHeaders = new Headers({
  Authorization: Vue.config.ubeatToken
});

export default {
  getPlaylists: function getPlaylists() {
    const reqLocTok = `${Vue.config.ubeatApiLocation}/playlists`;
    return fetch(new Request(reqLocTok, {
      method: 'GET',
      headers: reqHeaders
    }))
      .then(resp => resp.json())
      .then(data => data)
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
  }
};
