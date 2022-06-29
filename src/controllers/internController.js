const internModel = require('../models/collegeModel')
const eValidator = require('email-validator')

var phoneNo = /^\d{10}$/


const addIntern = async function(req,res){

    try{

        const data = req.body
        const { name, email, mobile,collegeId} = data

        if(Object.keys(data).length == 0){
            return res.status(400).send({status: false, message: "Please provide the Intern Details"})
        }

        if(!name){
            res.status(400).send({status: false, message: "Oops! you forget to enter name of your College"})
            return
        }

        if(typeof name !=="string" || name.trim().length == 0){
            res.status(400).send({status: false, message: "Enter the Intern name properly "})
            return
        }

        if(!email){
            res.status(400).send({status: false, message: "Oops! you forget to enter name of your College"})
            return
        }
        
        let checkEmail = eValidator.validate(email)
        if (!checkEmail){
            res.status(400).send({status: false, message: "Make sure the email is right format or not??"})
            return
        }

        // let uniqueEmail = await internModel.findOne({email :email})
        // if (uniqueEmail){
        //     res.status(400).send({status: false, message: "Sorry! this email is already exist"})
        //     return
        // }

        
        if(!mobile){
            res.status(400).send({status: false, message: "Oops! you forget to enter name of your College"})
            return
        }

        if(!phoneNo.test(mobile)){
            res.status(400).send({status: false, message: "Invalid Mobile Number"})
            return
        }


        if(!collegeId){
            res.status(400).send({status: false, message: "Oops! you forget to enter name of your College"})
            return
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