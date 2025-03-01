const Joi = require("joi");

// Middleware function to validate request data
const validateSubscription = (req, res, next) => {
  // Define Joi schema
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Invalid email format.",
      "any.required": "Email is required.",
    }),
    username: Joi.string().alphanum().min(3).required().messages({
      "string.alphanum": "Username must contain only letters and numbers.",
      "string.min": "Username must be at least 3 characters long.",
      "any.required": "Username is required.",
    }),
    dob: Joi.date().iso().required().messages({
      "date.base": "Date of birth must be a valid date.",
      "date.format": "Date of birth must be in ISO format (YYYY-MM-DD).",
      "any.required": "Date of birth is required.",
    }),
  });

  // Validate request body
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next(); // Proceed if validation passes
};

module.exports = validateSubscription;
