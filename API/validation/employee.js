const Joi = require('joi');

const createEmployee = {
    body: Joi.object({

        email: Joi.string().email().lowercase().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        password: Joi.string().min(8).required()
    })
};
const a = Joi.object({

    email: Joi.string().email().lowercase().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().min(8).required()
});

const createToken = {
    query: Joi.object({

        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(8).required()
    })
};


module.exports = {
    createEmployee,
    createToken,
    a
};