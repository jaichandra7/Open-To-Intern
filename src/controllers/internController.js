const internModel = require('../models/internModel')
const Validator = require('email-validator')
const collegeModel = require('../models/collegeModel')
const { default: mongoose } = require('mongoose')

var phoneNo = /^\d{10}$/

const addIntern = async function(req,res){

    try{

        const data = req.body
        const { name, email, mobile,collegeName} = data
       
        // validations

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
        if(!phoneNo.test(mobile)){
            res.status(400).send({status: false, message: "Use a valid Mobile Number"})
            return
        }

        let uniqueMobile = await internModel.findOne({mobile})
        if (uniqueMobile){
            res.status(400).send({status: false, message: "Sorry! this Mobile Number  is already exist"})
            return
        }

        if(!collegeName){
            res.status(400).send({status: false, message: "collegeName can't be Empty"})
            return
        }

        let uniqueCollegeId = await collegeModel.findOne({name : collegeName})
        if (!uniqueCollegeId){
            res.status(400).send({status: false, message: "No College Found with this College name"})
            return
        }

       let query = {
        name : name ,
        email :email ,
        mobile :mobile ,
        collegeId : uniqueCollegeId._id
       }

       if(typeof(data.isDeleted) != "undefined" && typeof(data.isDeleted) != "boolean"){
        return res.status(400).send({
            status : false,
            msg : "Incorrect input for isDeleted key"
        })  
       }
        (typeof(data.isDeleted) == "undefined") ? query.isDeleted = false : query.isDeleted = data.isDeleted
       
             let internData = await internModel.create(query)
            return res.status(201).send({status: true, data: internData})


    }
    catch(error){

        return res.status(500).send({status: false, message: error.message})

    }
}



module.exports.addIntern = addIntern