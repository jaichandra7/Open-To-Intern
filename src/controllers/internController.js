const internModel = require('../models/collegeModel')

const addIntern = async function(req,res){

    try{

        const data = req.body

        if(Object.keys(data).length == 0){
            return res.status(400).send({status: false, message: "Please provide the Intern Details"})
        }




        const internData = await internModel.create(data)
        return res.status(201).send({status: true, data: internData})


    }
    catch(error){

        return res.status(500).send({status: false, message: error.message})

    }
}

module.exports.addIntern =addIntern





// req.user = decorded.authorId