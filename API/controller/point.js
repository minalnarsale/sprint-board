const Point = require('../model/point');

module.exports = {

    createPoint : (req, res) => {

        let point = new Point({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            employeeId: req.userData.employeeId
        });

        point.save((err, result) => {

            if (err) {
                console.log('err : ', err);
                res.status(500).json({'message': 'problem in saving point details'});
            }
            else {
                console.log('point added : ', result);
                res.status(200).json({'message': 'point created', 'details': result});
            }
        });
    },

    updatePoint : async(req, res) => {

        let result = await Point.findOne({ _id: req.params.pointId});
        console.log('result : ', result);
        if(req.userData.employeeId === result.employeeId) {
            Point.updateOne({ _id: req.params.pointId}, req.body, (err, result) => {

                if(err) {
                    console.log('err : ', err);
                    res.status(500).json({'message':'problem in updating Point details'});
                }
                else {
                    console.log('point updated : ', result);
                    res.status(200).json({'message': req.params.pointId +' point is updated'});
                }
            });
        } else {
            res.status(401).json({'message': 'you are not allowed to edit a point created by other'});
        }
    },

    getAPoint : (req, res) => {

        Point.findOne({ _id: req.params.pointId}, (err, result) => {

            if(err) {
                console.log('err : ', err);
                res.status(500).json({'message':'problem in getting a point details'});
            }
            else {
                console.log('point : ', result);
                res.status(200).json(result);
            }
        });
    },

    getAllPoints : (req, res) => {

        const minCount = req.query.minCount;
        const maxCount = req.query.maxCount;
        console.log('minCount : ', minCount);
        console.log('maxCount : ', maxCount);
        const limitCount = (maxCount - minCount) + 1;
        const offsetCount = minCount - 1;

        Point.find({category:req.query.category}, (err, result) => {

            if(err) {
                console.log('err : ', err);
                res.status(500).json({'message':'problem in getting all point details'});
            }
            else {
                console.log('all points : ', result);
                res.status(200).json({'result': result});
            }
        }).sort({created_at: 'asc'}).skip(offsetCount).limit(limitCount);
    },

    deleteAPoint : async(req, res) => {

        let result = await Point.findOne({ _id: req.params.pointId});
        console.log('result : ', result);
        if(req.userData.employeeId === result.employeeId) {
            Point.deleteOne({ _id: req.params.pointId}, (err, result) => {

                if(err) {
                    console.log('err : ', err);
                    res.status(500).json({'message':'problem in deleting a point'});
                }
                else {
                    console.log('point deleted : ', result);
                    res.status(200).json({'message': req.params.pointId +' point is deleted'});
                }
            });
        } else {
            res.status(401).json({'message': 'you are not allowed to delete a point created by other'});
        }
    }
};
