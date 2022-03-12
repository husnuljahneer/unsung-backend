require('dotenv').config();
const express = require('express');
const app = express()
const port = process.env.PORT
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World')
})


app.listen(port, () => {
    console.log('Server started at port ' + port)
})