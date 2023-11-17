const Joi = require('joi');

function validateIssue(issue) {
  const schema = Joi.object({
    description: Joi.string().required(),
    category: Joi.string().required(),
    image: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    userId: Joi.string().required(),
    admin_replies: Joi.array().items(
      Joi.object({
        message: Joi.string().required(),
        timestamp: Joi.date().default(Date.now, 'current date')
      })
    )
  });

  return schema.validate(issue);
}

module.exports = validateIssue;

