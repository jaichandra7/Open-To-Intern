const express = require('express')
const router = express.Router()
const collegeController = require('../controllers/collegeController')
const internController = require('../controllers/internController')

//API for ADD College

router.post('/functionup/colleges', collegeController.createCollege )

router.post('/functionup/interns', internController.addIntern)

router.get('/functionup/collegeDetails', collegeController.getCollegeDetails)


router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        msg: "Make Sure Your Endpoint is Correct or Not!"
    })
})


module.exports = router