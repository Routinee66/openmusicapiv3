const autoBind = require('auto-bind');

class LikesHandler {
  constructor(service) {
    this.service = service;

    autoBind(this);
  }

  async postLikeHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    const { id: albumId } = request.params;
    const likeId = await this.service.addLike(userId, albumId);
    const response = h.response({
      status: 'success',
      message: 'Berhasil memberikan like',
      data: {
        likeId,
      },
    });
    response.code(201);
    return response;
  }

  async deleteLikeHandler(request) {
    const { id: userId } = request.auth.credentials;
    const { id: albumId } = request.params;
    await this.service.deleteLike(userId, albumId);
    return {
      status: 'success',
      message: 'Berhasil menghapus like',
    };
  }

  async getLikeHandler(request, h) {
    const { id: albumId } = request.params;
    const { likes, cache } = await this.service.getLike(albumId);
    const response = h.response({
      status: 'success',
      data: {
        likes,
      },
    });
    if (cache) response.header('X-Data-Source', 'cache');
    return response;
  }
}

module.exports = LikesHandler;
