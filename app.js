require('dotenv').config();
const express = require('express');
const app = express()
const port = process.env.PORT
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errorHandler');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World')
})

//unknown route
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.listen(port, () => {
    console.log('Server started at port ' + port)
})

//use ErrorRequestHandler
app.use(errorHandler);