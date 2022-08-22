if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const socket = require('socket.io');
const apiRoutes = require('./routes');
require('./db');

const app = express();
app.server = http.createServer(app);
const io = socket(app.server);

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: process.env.BODY_LIMIT }));
app.use(cors());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

const limiter = rateLimit({
    windowMS: 5*60*1000,
    max: 100
});

app.use(limiter);

app.use('/api/v1', apiRoutes);

const PORT = process.env.PORT;
app.server.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV}on Port ${PORT}`);
});
