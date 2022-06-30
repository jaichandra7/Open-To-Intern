const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')

const createCollege = async function(req,res){

    try{
        
        const data = req.body
        const { name, fullName, logoLink } = data ;
        const validName = /^[A-Za-z]+$/ ;

        if(Object.keys(data).length == 0 ){
            res.status(400).send({status: false, message: "you forget to fill all of these fields"})
            return
        }
        // **************************
        let collArr =["name", "fullName", "logoLink"]
        for (let i = 0; i < collArr.length;i++){
            let cData = []
            if(!Object.keys(data).includes(collArr[i])){
                    cData.push(collArr[i])
            }
            

            res.status(400).send({status: false, message: "you forget cData fields", data: cData})

        }

        // **************************


        if(!name){
            res.status(400).send({status: false, message: "Oops! you forget to enter name of your College"})
            return
        }

        if(typeof name !=="string" || name.trim().length == 0){
            res.status(400).send({status: false, message: "Enter the college name properly "})
            return
        }
        if(!validName.test(name)){
            res.status(400).send({status: false, message: " Use Characters Only !!"})
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

        if(!logoLink){
            res.status(400).send({status: false, message: "Oops! you forget to enter LOGO URL of your College"})
            return
        }


         if(typeof logoLink !=="string" || logoLink.trim().length == 0){
            res.status(400).send({status: false, message: "Make sure the LOGO URL is correct or not??"})
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

// const getCollegeDetails = async function(req, res){

//     try{
//         const name = req.query.collegeName;

//         if(!name){
//             return res.status(400).send({stats:false, message:"Please Provide College Name"});
//         }
//         const find = await collegeModel.findOne({name:name, isDeleted:false}).select({_id:1}); // id

//         const data = await collegeModel.findById(find).select({_id:0, name:1, fullName:1, logoLink:1});

//         if(!data){
//             return res.status(404).send({sataus:false, message: "No college Exits with the Name" })
//         }
        
// //          const match=await internModel.find({collegeId:find._id, isDeleted:false}).select({_id:1,name:1,email:1,mobile:1});
//         const internInfo = await internModel.find().populate('collegeId')
//         if(internInfo.length == 0){
//              return res.status(404).send({status:false, message:"No Intern Found For This College" })
//          }
//        console.log(internInfo)
//         if(match.length == 0){
//             return res.status(404).send({status:false, message:"No Intern Found For This College" })
//         }
//         // console.log(match)
//         // const collegeDetails = JSON.parse(JSON.stringify(data))
//         // collegeDetails.interns=match

//         res.status(200).send({status:true, data:collegeDetails})
//      }
//     catch (err){
//         res.status(500).send({status:false, message:err.message});

//     }
// };


// const getCollegeDetails  = async function (req , res){
//     try{
//         let collegeName = req.query.collegeName ;
//         let x = await collegeModel.find({name :collegeName})
//         if(!x[0]){
//             res.status(400).send({status : false ,  message: "Collehge not found"})
//             return
//         }
//         let y = await internModel.find().populate('')
//     }
// }
        // const data = await collegeModel.find({name : name , isDeleted : false})

        const getCollegeDetails = async function(req, res){

            try{
                let data =req.query
                if(Object.keys(data).length == 0 ){
                    res.status(400).send({status: false, message: "Query cannot be Empty"})
                    return
                }

                let collegeName = req.query.collegeName;
                const collegeData = await collegeModel.findOne({name: collegeName , isDeleted: false})
                // console.log(collegeData)

                if (!collegeData)return res.status(400).send({ status: false, message: "enter a valid college name" })
                
                const collegeDetails = {
                    name: collegeData.name,
                    fullName: collegeData.fullName,
                    logoLink: collegeData.logoLink
                }

                // const collegeId = collegeData._id
                const getInterns = await internModel.find({collegeId :collegeData._id}).select({_id: 1,name :1 ,email:1 , mobile :1 })
                // console.log(getInterns)
        
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