const express = require('express');
const router = express.Router();
const pointController = require('./API/controller/point');
const employeeController = require('./API/controller/employee');
const authentication = require('./API/utility/authentication');
const checkAuth = authentication.validateToken;

//create employee
router.post('/api/employee', (req, res) => employeeController.createEmployee(req, res));

//create token
router.get('/api/token', (req, res) => authentication.createToken(req, res));

//create points
router.post('/api/point', checkAuth, (req, res) => pointController.createPoint(req, res));

//update points
router.put('/api/point/:pointId', checkAuth, (req, res) => pointController.updatePoint(req, res));

//get a point by id
router.get('/api/point/:pointId', checkAuth, (req, res) => pointController.getAPoint(req, res));

//get list of points by category with pagination option
router.get('/api/points', checkAuth, (req, res) => pointController.getAllPoints(req, res));

//delete a point
router.delete('/api/point/:pointId', checkAuth, (req, res) => pointController.deleteAPoint(req, res));

module.exports = router;