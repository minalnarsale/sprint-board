const express = require('express');
const router = express.Router();
const pointController = require('./API/controller/point');
const employeeController = require('./API/controller/employee');
const authentication = require('./API/utility/authentication');
const checkAuth = authentication.validateToken;
const employeeValidation = require('./API/validation/employee');
const pointValidation = require('./API/validation/point');
const validator = require('express-joi-validation').createValidator({});

//create pints
router.post('/api/employee', validator.query(employeeValidation.createEmployee.body), (req, res) => employeeController.createEmployee(req, res));

//create token
router.get('/api/token', validator.query(employeeValidation.createToken.query), (req, res) => authentication.createToken(req, res));

//create points
router.post('/api/point', validator.headers(pointValidation.createPoint.headers), validator.body(pointValidation.createPoint.body), checkAuth, (req, res) => pointController.createPoint(req, res));

//update points
router.put('/api/point/:pointId', validator.headers(pointValidation.updatePoint.headers), validator.params(pointValidation.updatePoint.params), validator.body(pointValidation.updatePoint.body), checkAuth, (req, res) => pointController.updatePoint(req, res));

//get a point by id
router.get('/api/point/:pointId', validator.headers(pointValidation.getAPoint.headers), validator.params(pointValidation.getAPoint.params), checkAuth, (req, res) => pointController.getAPoint(req, res));

//get list of points
router.get('/api/points', validator.headers(pointValidation.getAllPoints.headers), validator.query(pointValidation.getAllPoints.query), checkAuth, (req, res) => pointController.getAllPoints(req, res));

//delete a point
router.delete('/api/point/:pointId', validator.headers(pointValidation.deleteAPoint.headers), validator.params(pointValidation.deleteAPoint.params), checkAuth, (req, res) => pointController.deleteAPoint(req, res));

module.exports = router;