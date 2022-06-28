const mongoose = require("mongoose")
const collegeModel = require("./collegeModel")

const internSchema = new mongoose.Schema({
    name:{
        required:true
    },
    email:{
        required:true,
        unique:true
    },
    mobile:{
        required:true,
        unique:true
    },
    collegeId:{
        ref:collegeModel,
        isDeleted:{ type:Boolean , default:false }
    }
},{timestamps:true})


module.exports = mongoose.model('internModel',internSchema)