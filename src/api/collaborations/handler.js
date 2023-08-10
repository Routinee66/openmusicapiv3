const autoBind = require('auto-bind');

class CollaborationHandler {
  constructor(collaborationsService, usersService, playlistsService, validator) {
    this.collaborationsService = collaborationsService;
    this.usersService = usersService;
    this.playlistsService = playlistsService;
    this.validator = validator;

    autoBind(this);
  }

  async postCollaborationHandler(request, h) {
    this.validator.validateCollaborationPayload(request.payload);
    const { playlistId, userId } = request.payload;
    const { id: credentialId } = request.auth.credentials;
    await this.usersService.verifyUser(userId);
    await this.playlistsService.verifyPlaylist(playlistId);
    await this.playlistsService.verifyPlaylistOwner(playlistId, credentialId);

    const collaborationId = await this.collaborationsService.addCollaboration(playlistId, userId);
    const response = h.response({
      status: 'success',
      message: 'Berhasil menambahkan collaboration',
      data: {
        collaborationId,
      },
    });

    response.code(201);
    return response;
  }

  async deleteCollaborationHandler(request) {
    this.validator.validateCollaborationPayload(request.payload);
    const { playlistId, userId } = request.payload;
    const { id: credentialId } = request.auth.credentials;
    await this.usersService.verifyUser(userId);
    await this.playlistsService.verifyPlaylist(playlistId);
    await this.playlistsService.verifyPlaylistOwner(playlistId, credentialId);

    await this.collaborationsService.deleteCollaboration(playlistId, userId);
    return {
      status: 'success',
      message: 'Berhasil menghapus collaboration',
    };
  }
}

module.exports = CollaborationHandler;
