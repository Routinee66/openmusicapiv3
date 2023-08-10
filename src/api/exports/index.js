const routes = require('./routes');
const ExportPlaylistsHandler = require('./handler');

module.exports = {
  name: 'openmusic-exports',
  version: '1.0.0',
  register: async (server, { producerService, playlistsService, validator }) => {
    const exportPlaylistsHandler = new ExportPlaylistsHandler(
      producerService,
      playlistsService,
      validator,
    );
    server.route(routes(exportPlaylistsHandler));
  },
};
