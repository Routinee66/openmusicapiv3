const autoBind = require('auto-bind');

class ExportPlaylistsHandler {
  constructor(producerService, playlistsService, validator) {
    this.producerService = producerService;
    this.playlistsService = playlistsService;
    this.validator = validator;

    autoBind(this);
  }

  async postExportPlaylistHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const { playlistId } = request.params;
    await this.playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    this.validator.validateExportPlaylistsPayload(request.payload);
    const message = {
      playlistId,
      targetEmail: request.payload.targetEmail,
    };
    await this.producerService.sendMessage('export:playlists', JSON.stringify(message));

    const response = h.response({
      status: 'success',
      message: 'Berhasil menambahkan antrean',
    });
    response.code(201);
    return response;
  }
}

module.exports = ExportPlaylistsHandler;
