// validators/issueValidator.js
const Joi = require('joi');

function validateIssue(issue) {
  const schema = Joi.object({
    description: Joi.string().required(),
    category: Joi.string().required(),
    image: Joi.string().required(),
    location: Joi.string().required(),
    userId: Joi.string().required(),
    status: Joi.string().valid('pending', 'acknowledged', 'in-progress', 'resolved').required(),
  });

  return schema.validate(issue);
}

module.exports = validateIssue;
