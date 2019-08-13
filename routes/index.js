const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('home');
})

router.get('/members', (req, res)=>{
    res.render('members');
})

module.exports = router;