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
  updatePlaylistName: function updatePlaylistName(playlist, name, id) {
    const reqBody = new URLSearchParams(playlist);
    reqBody.set('name', name);
    const reqLoc = `${Vue.config.ubeatApiLocation}/playlists/${id}`;
    return fetch(new Request(reqLoc, { method: 'PUT', headers: reqHeaders, body: reqBody }))
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
  }
};
