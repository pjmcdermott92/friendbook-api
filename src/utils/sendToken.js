const sendToken = (user, res, statusCode = 200) => {
    const token = user.getJWT();
    const options = {
        expires: new Date(Date.now() + process.env.TOKEN_EXPIRES * 24 *60 * 60 * 1000),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    };

    res.status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token,
        });
};

module.exports = sendToken;
