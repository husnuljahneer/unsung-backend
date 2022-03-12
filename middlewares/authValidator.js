const Joi = require('joi')

const schemas = {
    signup: Joi.object().keys({
        username: Joi.string()
            .min(3)
            .max(30)
            .required(),
        password: Joi.string()
            .min(6)
            .max(30)
            .required(),
    }),
    login: Joi.object().keys({
        username: Joi.string()
            .min(3)
            .max(30)
            .required(),
        password: Joi.string()
            .min(6)
            .max(30)
            .required(),
    })
};
module.exports = schemas;