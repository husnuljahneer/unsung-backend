const express = require('express');
const router = express.Router();
const authRouter = ('../routes/authRoute');
app.use(authRouter);

module.exports = router;