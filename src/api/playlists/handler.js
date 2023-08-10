const autoBind = require('auto-bind');

class PlaylistsHandler {
  constructor(playlistsService, songsService, activitiesService, tokenManager, validator) {
    this.playlistsService = playlistsService;
    this.activitiessService = activitiesService;
    this.songsService = songsService;
    this.tokenManager = tokenManager;
    this.validator = validator;

    autoBind(this);
  }

  async postPlaylistHandler(request, h) {
    this.validator.validatePlaylistPayload(request.payload);
    const { name: playlist } = request.payload;
    const { id: credentialId } = request.auth.credentials;
    const playlistId = await this.playlistsService.addPlaylist(playlist, credentialId);
    const response = h.response({
      status: 'success',
      message: 'Berhasil membuat playlist',
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  }

  async getPlaylistHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const playlists = await this.playlistsService.getPlaylists(credentialId);
    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  async deletePlaylistHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const { id: playlistId } = request.params;
    await this.playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    await this.playlistsService.deletePlaylist(playlistId);
    return {
      status: 'success',
      message: 'Berhasil manghapus playlists',
    };
  }

  async postPlaylistSongHandler(request, h) {
    this.validator.validatePlaylistSongPayload(request.payload);
    const { songId } = request.payload;
    await this.songsService.verifySong(songId);

    const { id: credentialId } = request.auth.credentials;
    const { id: playlistId } = request.params;
    await this.playlistsService.verifyPlaylistAccess(playlistId, credentialId);

    const playlistSongId = await this.playlistsService.addPlaylistSong(playlistId, songId);
    await this.activitiessService.addActivities(playlistId, songId, credentialId, 'add');
    const response = h.response({
      status: 'success',
      message: 'Berhasil menambahkan lagu pada playlist',
      data: {
        playlistSongId,
      },
    });
    response.code(201);
    return response;
  }

  async getPlaylistSongHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const { id: playlistId } = request.params;
    await this.playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    const playlist = await this.playlistsService.getPlaylistById(playlistId, credentialId);
    const songs = await this.playlistsService.getPlaylistSong(playlistId);
    playlist.songs = songs;
    return {
      status: 'success',
      data: {
        playlist,
      },
    };
  }

  async deletePlaylistSongHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const { id: playlistId } = request.params;
    const { songId } = request.payload;
    await this.playlistsService.verifyPlaylistAccess(playlistId, credentialId);

    await this.playlistsService.deletePlaylistSong(songId);

    await this.activitiessService.addActivities(playlistId, songId, credentialId, 'delete');
    return {
      status: 'success',
      message: 'Berhasil menghapus lagu dari playlist',
    };
  }

  async getPlaylistActivitiesHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const { id: playlistId } = request.params;
    await this.playlistsService.verifyPlaylistAccess(playlistId, credentialId);

    const activities = await this.activitiessService.getActivities(playlistId);
    return {
      status: 'success',
      data: {
        playlistId,
        activities,
      },
    };
  }
}

module.exports = PlaylistsHandler;
