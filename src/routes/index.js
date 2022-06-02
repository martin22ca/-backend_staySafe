const { Router } = require('express');
const router = Router();

const { getUsers, getCrimes,post_event } =require('../controlers/index.controllers')

router.get('/users',getUsers)
router.get('/crimes',getCrimes)
router.post('/post', post_event)

module.exports = router;