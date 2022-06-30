const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')


const createCollege = async function(req,res){

    try{

        const data = req.body
        const { name, fullName, logoLink } = data ;
        const validName = /^[A-Za-z]+$/ ;
        const validlogolink = /(http|https(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/

        // Validations

        if(Object.keys(data).length == 0 ){
            res.status(400).send({status: false, message: "you forget to fill all of these fields"})
            return
        }
         //Values Cannot Be Empty
        
        if(!name){
            res.status(400).send({status: false, message: "Oops! you forget to enter name of your College"})
            return
        }
        //Please Enter The College Name

        if(typeof name !=="string" || name.trim().length == 0){
            res.status(400).send({status: false, message: "Enter the college name properly "})
            return
        }
        //Enter the College Name In String
        if(!validName.test(name)){
            res.status(400).send({status: false, message: " Use Characters Only !!"})
            return
        }
        //Only characters are allowed
        let uniqueName = await collegeModel.findOne({name : name})
        if(uniqueName) {
                res.status(400).send({status: false, message: "College Name already exists"})
                return 
            }
            //College Name Is Already Registered
    
        if(!fullName){
            res.status(400).send({status: false, message: "Oops! you forget to enter Full Name of your College"})
            return
        }
        //Please Provide Full Name Of The College

        if(typeof fullName !=="string" || fullName.trim().length == 0){
            res.status(400).send({status: false, message: "Enter the college fullName properly "})
            return
        }
        //Please Enter The Full Name In String , Null value Is Not Accepted
        
        if(!logoLink){
            res.status(400).send({status: false, message: "Oops! you forget to enter LOGO URL of your College"})
            return
        }
        //Please Provide The Logo Url

         if(typeof logoLink !=="string" || logoLink.trim().length == 0){
            res.status(400).send({status: false, message: "Make sure the LOGO URL is correct or not??"})
            return
        }
        //The Logo Must Be In String and Not Blank

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
                //Blank Query Is Not Accepted!
                
                let collegeName = req.query.collegeName.trim();
                if(!collegeName ) {
                    res.status(400).send({status: false, message: "College Name can't be Empty "})
                    return
                }
                //Entered College Name Is Not Valid // College Name Cannot Be Blank

                if(collegeName.trim().length == 0){
                    res.status(400).send({status: false, message: "Enter the college Name properly "})
                    return
                }
                // College Name Cannot Be Blank //Improper College Name
                const collegeData = await collegeModel.findOne({name: collegeName , isDeleted: false})

                if (!collegeData)return res.status(400).send({ status: false, message: "No college name" })
                //No College Data
                
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
                //Interns Value Is Empty //No Interns Found
            }
            catch (err) {
                res.status(500).send({ status:false , error: err.message})
            }
        }

module.exports.getCollegeDetails = getCollegeDetails
module.exports.createCollege = createCollege




