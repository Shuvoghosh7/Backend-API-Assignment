const mongoose = require("mongoose");
const validator = require('validator');


const fileSchema = mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    filepath:{
        type:String,
        required:true
    }
    
},{
    timestamps: true
})


const File = mongoose.model('File', fileSchema);

module.exports=File;