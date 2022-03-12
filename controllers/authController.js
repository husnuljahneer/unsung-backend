const login = require('../services/authService');

exports.login = (req, res) => {
    const { username, password } = req.body;
    if (username == '' || password == '') {
        res.status(400).send({
            message: 'Invalid Username or Password'
        });
    } else {
        const loginData = login.login({
            username,
            password
        });
        if (loginData) {
            res.status(200).send({
                message: 'Login Success',
                data: username + ' ' + password
            });
        } else {
            res.status(400).send({
                message: 'Login Failed',
                data: 'Invalid Username or Password'
            });
        }
    }
}