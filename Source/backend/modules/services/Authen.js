const jwt = require('jsonwebtoken');

async function authenAPI(token) {
    if (!token) {
        return { message: 'No token provided', result: false };
    }
    try {
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    reject({ message: 'Invalid token', result: false });
                } else {
                    resolve(decoded);
                }
            });
        });
        return { message: 'Access granted', user: decoded, result: true };
    } catch (error) {
        return error;
    }
}

module.exports = authenAPI;
