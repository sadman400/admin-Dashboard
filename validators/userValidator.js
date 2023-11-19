const Joi = require('joi');

function validateUser(user) {
  try {
    console.log('Validating user:', user);
    
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      user_replies: Joi.array()
      
    });

    const options = {
      abortEarly: false,  // To collect all validation errors, not just the first one
      allowUnknown: true  // To allow unknown fields in the input data
    };

    const result = schema.validate(user, options);
    console.log('Validation result:', result);

    return result;
  } catch (error) {
    console.error('Error during validation:', error);
    throw error;
  }
}

module.exports = validateUser;
