const { loginUser, signupUser } = require("../services/authService");
require("dotenv").config();

exports.signup = async(req, res, next) => {
    if (req.body.username == "" || req.body.password == "") {
        res.status(400).send({
            message: "Invalid Username or Password",
        });
    } else {
        try {
            const user = await signupUser(req.body);
            res.status(200).send({
                message: "User created successfully",
                user
            });
        } catch (err) {
            next(err);
        }
    }
}

exports.login = async(req, res, next) => {
    try {
        const { username, password } = req.body;
        if (username == "" || password == "") {
            res.status(400).send({
                message: "Invalid Username or Password",
            });
        } else {
            const loginData = await loginUser(req.body);
            if (loginData) {
                res.status(200).send({
                    message: "Login Success",
                    data: username + " " + password,
                });
            } else {
                res.status(400).send({
                    message: "Login Failed",
                    data: "Invalid Username or Password",
                });
            }
        }
    } catch (err) {
        next(err);
    }
};