const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const sendToken = require('../utils/sendToken');
const User = require('../models/user');
const { nextTick } = require('process');

// GET /api/v1/users - Get All Users - Private Route
exports.getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json({ success: true, data: users });
});

// GET /api/v1/users/me - Get Current User - Private Route
exports.currentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json({ success: true, data: user });
});

// POST /api/v1/users - Login User - Public Route
exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || ! password) return nextTick(new ErrorResponse(
        'Email Address and Password required'
    ));

    const invalidResponse = ('Invalid Credentials');
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) return nextTick(invalidResponse);
    const isMatch = await user.checkPassword(password);
    if (!isMatch) return next(invalidResponse);

    sendToken(user, res);
});

// POST /api/v1/users/register - Register User - Public Route
exports.registerUser = asyncHandler(async (req, res) => {
    const { first_name, last_name, email, gender, birth_date } = req.body;
    if (!first_name || !last_name || !email || !gender || !birth_date) {
        return next(new ErrorResponse('Please provide all required information'));
    };

    const user = await User.create({ ...req.body });
    sendToken(user, req);
});
