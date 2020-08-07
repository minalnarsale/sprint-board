const Employee = require('../model/employee');
const bcrypt = require('bcrypt');

module.exports = {

    createEmployee: (req, res) => {

        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if(err) {
                console.log('err : ', err);
                res.status(404).json({'error': err});
            } else {
                let employee = new Employee({
                    email: req.body.email,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    password: hash,
                });

                employee.save((err, result) => {
                    if (err) {
                        console.log('err : ', err);
                        res.status(500).json({'message': 'problem in saving employee details'});
                    }
                    else {
                        res.status(200).json({'message': 'employee detail has been saved'});
                    }
                });
            }
        });
    }
};