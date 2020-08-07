const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const Employee = require('../model/employee');

module.exports = {

    createToken : (req, res) => {

        Employee.findOne({ email: req.query.email})
            .exec()
            .then(employee => {

                bcrypt.compare(req.query.password, employee.password, (err, result) => {

                    if(err) {
                        console.log('err : ', err);
                        res.status(401).json({'message':'Auth Failed'});
                    } else {
                        console.log('result : ', result);
                        if(result) {
                            const token = jwt.sign(
                                {
                                    email: employee.email,
                                    employeeId: employee._id
                                },
                                process.env.JWT_KEY,
                                {
                                    expiresIn: "1h"
                                }
                            );
                            res.status(200).json({'message':'Auth Successful', 'token': token});
                        } else {
                            res.status(500).json({'message':'Auth Failed', 'error': 'password incorrect'})
                        }
                    }
                });
            })
            .catch(err => res.status(500).json({'message':'Auth Failed', 'error': 'email does not exists'}));
    },

    validateToken : (req, res, next) => {

        try {
            //get original token back without 'Bearer' word
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            console.log('decoded data(jwt token validation state ): ', decoded);
            req.userData = decoded;
            next();
        } catch (error) {
            res.status(401).json({message: 'Auth failed'});
        }
    }
};