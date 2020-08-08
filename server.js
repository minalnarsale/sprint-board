const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

//middleware : creating express server
const app = express();

//middleware: separation of incoming request into req.header, req.body
app.use(bodyParser.urlencoded({ extended: true }));

//middleware: req.body -> Json object conversion
app.use(bodyParser.json());

//middleware: adding logger for each request coming to server
app.use((req, res, next) => {
    console.log(new Date(), req.method, (decodeURIComponent(req.url)));
    next();
});




//middleware : connecting to DB
mongoose.connect('mongodb://localhost:27017/sprint-board', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
mongoose.connection
    .once('open', () => console.log('DB connection Successful!'))
    .on('error', error => {
        console.log('Error in DB connection!', error);
    });
mongoose.plugin(timestamps,  {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

//start server
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));

//middleware : serving REST API routes
app.use('/', require('./routes'));
