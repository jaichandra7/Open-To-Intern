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
        //Please Provide Intern Name 

        if(typeof name !== "string" || name.trim().length == 0){
            res.status(400).send({status: false, message: "Enter the Intern name properly "})
            return
        }
        //Intern Name Must Not Be Empty , Should be In String 

        if(!email){
            res.status(400).send({status: false, message: "Oops! you forget enter email ID"})
            return
        }
        //Please Provide The Email Id
        
        let checkEmail = Validator.validate(email)
        if (!checkEmail){
            res.status(400).send({status: false, message: "Make sure the email is in right format "})
            return
        }
        //Provided Email Is Not In A Valid Format

        let uniqueEmail = await internModel.findOne({email})
        if (uniqueEmail){
            res.status(400).send({status: false, message: "Sorry! this email is already exist"})
            return
        }
        //This Email Is Already Registered

        if(!mobile){
            res.status(400).send({status: false, message: "Mobile Number can't be Empty"})
            return
        }
        //Please Enter Mobile Number
        if(!phoneNo.test(mobile)){
            res.status(400).send({status: false, message: "Use a valid Mobile Number"})
            return
        }
        //Not A Valid Mobile Number 

        let uniqueMobile = await internModel.findOne({mobile})
        if (uniqueMobile){
            res.status(400).send({status: false, message: "Sorry! this Mobile Number  is already exist"})
            return
        }
        //Entered Mobile Number Is Already Registered

        if(!collegeName){
            res.status(400).send({status: false, message: "collegeName can't be Empty"})
            return
        }
        // College Name Cannot Be Blank
        


        let uniqueCollegeId = await collegeModel.findOne({name : collegeName})
        if (!uniqueCollegeId){
            res.status(400).send({status: false, message: "No College Found with this College name"})
            return
        }
        //Blank CollegeId Is Not Accepted  // No College Is Registered With This Id

       let query = {
        name : name ,
        email :email ,
        mobile :mobile ,
        collegeId : uniqueCollegeId._id
       }

       if(typeof(data.isDeleted) != "undefined" && typeof(data.isDeleted) != "boolean"){
        return res.status(400).send({
            status : false,
            message : "Incorrect input for isDeleted key"
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