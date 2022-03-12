require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
// deepcode ignore HardcodedSecret: <Hardcoded>
const saltRounds = 10;
const CreateError = require("http-errors");

exports.signupUser = async({ username, password }) => {

    try {
        const userExist = await prisma.users.findUnique({
            where: {
                username,
            },
        })

        if (userExist) {
            throw new Error('User already exist')
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await prisma.users.create({
            data: {
                username,
                password: hashedPassword
            }
        })
        return user
    } catch (err) {
        throw err
    }
}

exports.loginUser = async({ username, password }) => {
    try {
        const user = await prisma.users.findFirst({
            where: {
                username,
            },
        })
        if (!user) {
            throw new Error('User does not exist')
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new Error("Invalid Email or Password");
        }
        return user;
    } catch (err) {
        throw err
    }
}