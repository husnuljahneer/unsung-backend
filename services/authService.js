exports.login = ({ username, password }) => {
    const loginData = prisma.findUnique({
        where: {
            username,
            password
        }
    })
    if (loginData) {
        return {
            message: 'Login Success',
            data: username + ' ' + password
        }
    }
    return {
        message: 'Login Failed',
        data: 'Invalid Username or Password'
    }

};