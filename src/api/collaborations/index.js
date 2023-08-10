const CollaborationHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'openmusic-collaborations',
  verson: '1.0.0',
  register: async (server, {
    collaborationsService,
    usersService,
    playlistsService,
    validator,
  }) => {
    const collaborationsHandler = new CollaborationHandler(
      collaborationsService,
      usersService,
      playlistsService,
      validator,
    );
    server.route(routes(collaborationsHandler));
  },
};
