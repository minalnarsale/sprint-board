const mongoose = require('mongoose');

const PointSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    category: {
        type: String,
        enum: ['Went well', 'Didn\'t go well', 'Need to improve', 'extras']
    },
    employeeId: {
        type: String
    }
});
module.exports = mongoose.model('Point', PointSchema);