const express = require('express');
const authRouter = express.Router();

const User = require('./users-model.js');
const auth = require('./middleware.js');
const oauth = require('./oauth/google.js');

router.get('/public-stuff')

router.get('/hidden-stuff')

router.get('/something-to-read')

router.post('/create-a-thing')

router.put('/update')

router.patch('/jp')

router.delete('/bye-bye')

router.get('/everything')