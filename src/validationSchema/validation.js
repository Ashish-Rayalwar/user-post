const Joi = require("joi");

const userValidation = Joi.object({
  name: Joi.string().min(3).max(10).required().lowercase(),
  email: Joi.string().required().email().lowercase(),
  password: Joi.string().max(15).min(7).required(),
});

const loginValidation = Joi.object({
  email: Joi.string().required().email().lowercase(),
  password: Joi.string().max(15).min(7).required(),
});

const postValidation = Joi.object({
  title: Joi.string().min(1).max(30),
  body: Joi.string().min(1).max(2000),
  status: Joi.string().valid("active", "inactive"),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
});

const getPostsValidation = Joi.object({
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
});
const postUpdateValidation = Joi.object({
  title: Joi.string().min(2).max(30),
  body: Joi.string().min(4).max(2000),
  latitude: Joi.number(),
  longitude: Joi.number(),
});



module.exports = {
  userValidation,
  postValidation,
  loginValidation,
  postUpdateValidation,
  getPostsValidation,
};
