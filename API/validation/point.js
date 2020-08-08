const Joi = require('@hapi/joi');

const createPoint = {
    body: Joi.object({

        title: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().valid('Went well','Didn\'t go well','Need to improve','extras').required(),
    }),
    headers: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
};

const updatePoint = {
    params: Joi.object({

        pointId: Joi.string().required(),
    }),
    body: Joi.object({

        title: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().valid('Went well','Didn\'t go well','Need to improve','extras').required(),
    }),
    headers: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
};

const getAPoint = {
    params: Joi.object({

        pointId: Joi.string().required(),
    }),
    headers: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
};

const getAllPoints = {
    query: Joi.object({

        minCount: Joi.number().required(),
        maxCount: Joi.number().required(),
        category: Joi.string().valid('Went well','Didn\'t go well','Need to improve','extras').required()
    }),
    headers: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
};

const deleteAPoint = {
    params: Joi.object({

        pointId: Joi.string().required(),
    }),
    headers: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
};

module.exports = {
    createPoint,
    updatePoint,
    getAPoint,
    getAllPoints,
    deleteAPoint
};