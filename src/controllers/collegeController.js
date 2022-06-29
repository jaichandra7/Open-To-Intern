const collegeModel = require('../models/collegeModel')

const createCollege = async function(req,res){

    try{
        
        const data = req.body
        const { name, fullName, logoLink } = data ;
        const validName = /[a-z]/ ;

        if(Object.keys(data).length == 0 ){
            res.status(400).send({status: false, message: "you forget to fill all of these fields"})
            return
        }

        if(!name){
            res.status(400).send({status: false, message: "Oops! you forget to enter name of your College"})
            return
        }
        if(!validName.test(name)){
            res.status(400).send({status:false , message : "Upper Cases are not allowed in name Field"})
            return
        }
        if(!fullName){
            res.status(400).send({status: false, message: "Oops! you forget to enter Full Name of your College"})
            return
        }

        if(!logoLink){
            res.status(400).send({status: false, message: "Oops! you forget to enter LOGO URL of your College"})
            return
        }
       
        const collegeData = await collegeModel.create(data)
        return res.status(201).send({status: true, data: collegeData})


    }
    catch(error){

        return res.status(500).send({status: false, message: error.message})

    }
}

module.exports.createCollege = createCollege