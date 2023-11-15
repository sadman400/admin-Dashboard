// validators/userValidator.js
const Joi = require('joi');

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  });

  return schema.validate(user);
}

module.exports = validateUser;
