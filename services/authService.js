const bcrypt = require("bcrypt");
// deepcode ignore HardcodedSecret: <Hardcoded>
const saltRounds = 10;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const CreateError = require("http-errors");
const logger = require("../utils/logger");
require("dotenv").config();

exports.createUser = async({ username, password }) => {
    try {
        const userExist = await prisma.user.findUnique({
            where: {
                username,
            },
        });

        if (userExist) {
            throw CreateError(400, "User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });
        return user;
    } catch (err) {
        logger.error(err);
        throw err;
    }
};

exports.generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
};

exports.generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

exports.verifyRefreshToken = (refreshToken) => {
    return jwt.sign(refreshToken, process.env.JWT_REFRESH_SECRET);
};

exports.loginUser = async({ username, password }) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                username,
            },
        });

        if (!user) {
            throw CreateError(400, "Invalid Username or Password");
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw CreateError(401, "Invalid Username or Password");
        }
        return user;
    } catch (err) {
        logger.error(err);
        throw err;
    }
};