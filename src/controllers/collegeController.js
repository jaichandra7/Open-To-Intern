const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')


const createCollege = async function(req,res){

    try{

        const data = req.body
        const { name, fullName, logoLink } = data ;
        const validName = /^[A-Za-z -]+$/ ;
        const validFullname = /^[A-Za-z -,]+$/
        const validlogolink = /(http|https(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/

        // Validations

        if(Object.keys(data).length == 0 ){
            res.status(400).send({status: false, message: "you forget to fill all of these fields"})
            return
        }
        
        if(!name){
            res.status(400).send({status: false, message: "Oops! you forget to enter name of your College"})
            return
        }

        if(typeof name !=="string" || name.trim().length == 0){
            res.status(400).send({status: false, message: "Enter the college name properly "})
            return
        }
        if(!validName.test(name)){
            res.status(400).send({status: false, message: "  Provide name in correct format !!"})
            return
        }
        let uniqueName = await collegeModel.findOne({name : name})
        if(uniqueName) {
                res.status(400).send({status: false, message: "College Name already exists"})
                return 
            }
    
        if(!fullName){
            res.status(400).send({status: false, message: "Oops! you forget to enter Full Name of your College"})
            return
        }

        if(typeof fullName !=="string" || fullName.trim().length == 0){
            res.status(400).send({status: false, message: "Enter the college fullName properly "})
            return
        }
        if(!validFullname.test(fullName)){
            res.status(400).send({status: false, message: " Provide fullname in correct format !!"})
            return
        }
        
        if(!logoLink){
            res.status(400).send({status: false, message: "Oops! you forget to enter LOGO URL of your College"})
            return
        }

         if(typeof logoLink !=="string" || logoLink.trim().length == 0){
            res.status(400).send({status: false, message: "Make sure the LOGO URL is correct or not??"})
            return
        }

        if(!validlogolink.test(logoLink)){
            res.status(400).send({status: false, message: "Invalid Link format"})
            return 
        }
        

        const collegeData = await collegeModel.create(data)
        return res.status(201).send({status: true, data: collegeData})

    }
    catch(error){

        return res.status(500).send({status: false, message: error.message})

    }
}

// ***********************************************************************************************

        const getCollegeDetails = async function(req, res){

            try{
                let data =req.query

                // validations

                if(Object.keys(data).length == 0 ){
                    res.status(400).send({status: false, message: "Query cannot be Empty"})
                    return
                }
                
                let collegeName = req.query.collegeName.trim();
                if(!collegeName ) {
                    res.status(400).send({status: false, message: "College Name can't be Empty "})
                    return
                }

                if(collegeName.trim().length == 0){
                    res.status(400).send({status: false, message: "Enter the college Name properly "})
                    return
                }

                const collegeData = await collegeModel.findOne({name: collegeName , isDeleted: false})
                if (!collegeData)return res.status(400).send({ status: false, message: "No college found for the query" })
                
                const collegeDetails = {
                    name: collegeData.name,
                    fullName: collegeData.fullName,
                    logoLink: collegeData.logoLink
                }

                const getInterns = await internModel.find({collegeId :collegeData._id}).select({_id: 1,name :1 ,email:1 , mobile :1 })
        
                if(getInterns.length!=0){
                    collegeDetails.interns = getInterns
                    res.status(200).send({status: true , data: collegeDetails})
                }

                if(getInterns.length == 0)return res.status(400).send({ status: false, message: "No interns found" })
            }
            catch (err) {
                res.status(500).send({ status:false , error: err.message})
            }
        }

module.exports.getCollegeDetails = getCollegeDetails
module.exports.createCollege = createCollege




