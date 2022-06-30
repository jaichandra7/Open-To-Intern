const internModel = require('../models/internModel')
const Validator = require('email-validator')
const collegeModel = require('../models/collegeModel')

var phoneNo = /^\d{10}$/


const addIntern = async function(req,res){

    try{

        const data = req.body
        const { name, email, mobile,collegeId} = data
        
        // Validations
        if(Object.keys(data).length == 0){
            return res.status(400).send({status: false, message: "Please provide the Intern Details"})
        }

        if(!name){
            res.status(400).send({status: false, message: "Please provide your name !!"})
            return
        }

        if(typeof name !== "string" || name.trim().length == 0){
            res.status(400).send({status: false, message: "Enter the Intern name properly "})
            return
        }

        if(!email){
            res.status(400).send({status: false, message: "Oops! you forget enter email ID"})
            return
        }
        
        let checkEmail = Validator.validate(email)
        if (!checkEmail){
            res.status(400).send({status: false, message: "Make sure the email is in right format "})
            return
        }

        let uniqueEmail = await internModel.findOne({email})
        if (uniqueEmail){
            res.status(400).send({status: false, message: "Sorry! this email is already exist"})
            return
        }

        if(!mobile){
            res.status(400).send({status: false, message: "Mobile Number can't be Empty"})
            return
        }

        let uniqueMob = await internModel.find({mobile})
        if (uniqueMob[0]){
            res.status(400).send({status: false, message: "Sorry! this Mobile Number  is already exist"})
            return
        }

        if(!phoneNo.test(mobile)){
            res.status(400).send({status: false, message: "Use a valid Mobile Number"})
            return
        }


        if(!collegeId){
            res.status(400).send({status: false, message: "CollegeId can't be Empty"})
            return
        }

        let uniqueCollegeId = await internModel.find({collegeId})
        if (uniqueCollegeId.length == 0){
            res.status(400).send({status: false, message: "No College Found with this College ID"})
            return
        }


        const internData = await internModel.create(data)
        return res.status(201).send({status: true, data: internData})


    }
    catch(error){

        return res.status(500).send({status: false, message: error.message})

    }
}



module.exports.addIntern = addIntern