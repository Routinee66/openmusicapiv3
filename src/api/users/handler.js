const autoBind = require('auto-bind');

class UsersHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    autoBind(this);
  }

  async postUserHandler(request, h) {
    this.validator.UserPayloadValidate(request.payload);
    const { username, password, fullname } = request.payload;
    const userId = await this.service.postUser(username, password, fullname);

    const response = h.response({
      status: 'success',
      message: 'Berhasil menambahkan user baru',
      data: { userId },
    });
    response.code(201);
    return response;
  }
}

module.exports = UsersHandler;
