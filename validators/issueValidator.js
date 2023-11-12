const Joi = require('joi');

function validateIssue(issue) {
  const schema = Joi.object({
    description: Joi.string().required(),
    category: Joi.string().required(),
    image: Joi.string().required(),
    location: Joi.string().required(),
  });

  return schema.validate(issue);
}

module.exports = validateIssue;
