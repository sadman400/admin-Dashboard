const Joi = require('joi');

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    user_replies: Joi.array().items(
      Joi.object({
        message: Joi.string().required(),
        timestamp: Joi.date().default(Date.now, 'current date')
      })
    )
  });

  return schema.validate(user);
}

module.exports = validateUser;
