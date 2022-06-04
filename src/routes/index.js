const { Router } = require('express');
const router = Router();

const { getUsers, getCrimesLoc,post_event,getCrimes } =require('../controlers/index.controllers')

router.get('/users',getUsers)
router.get('/crimesInfo',getCrimes)
router.get('/crimes',getCrimesLoc)
router.post('/post', post_event)

module.exports = router;