const Joi = require('joi');

const UserPayloadSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(20)
    .required(),

  password: Joi.string()
    .min(5)
    .required(),

  fullname: Joi.string()
    .min(5)
    .required(),
});

module.exports = { UserPayloadSchema };
