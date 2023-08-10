const routes = require('./routes');
const AuthenticationsHandler = require('./handler');

module.exports = {
  name: 'openmusic-authentications',
  version: '1.0.0',
  register: async (server, {
    authenticationsService,
    usersService,
    tokenManager,
    validator,
  }) => {
    const authenticationHandler = new AuthenticationsHandler(
      authenticationsService,
      usersService,
      tokenManager,
      validator,
    );
    server.route(routes(authenticationHandler));
  },
};
