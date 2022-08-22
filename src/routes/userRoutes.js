const { Router } = require('express');
const api = Router();

api.get('/', (req, res) => res.send('HI THERE!'));

module.exports = api;
