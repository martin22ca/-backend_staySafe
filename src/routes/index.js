const { Router } = require('express');
const router = Router();

const { getUsers, getCrimesLoc,post_event,getCrimesTypes } =require('../controlers/index.controllers')

router.get('/users',getUsers)
router.get('/dash/:id',getCrimesTypes)
router.get('/crimes',getCrimesLoc)
router.post('/post', post_event)

module.exports = router;