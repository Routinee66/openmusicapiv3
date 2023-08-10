const Joi = require('joi');

const PostAuthenticationSchemaPayload = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const PutAuthenticationSchemaPayload = Joi.object({
  refreshToken: Joi.string().required(),
});

const DeleteAuthenticationSchemaPayload = Joi.object({
  refreshToken: Joi.string().required(),
});

module.exports = {
  PostAuthenticationSchemaPayload,
  PutAuthenticationSchemaPayload,
  DeleteAuthenticationSchemaPayload,
};
