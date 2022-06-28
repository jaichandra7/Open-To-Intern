const collegeModel = require('../models/collegeModel')

const createCollege = async function(req,res){

    try{

        const data = req.body



        const collegeData = await collegeModel.create(data)
        return res.status(201).send({status: true, data: collegeData})


    }
    catch(error){

        return res.status(500).send({status: false, message: error.message})

    }
}

module.exports.createCollege = createCollege