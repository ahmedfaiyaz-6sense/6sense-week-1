const express = require("express");
const multer = require("multer")

const profile_upload = express.Router();
const path = require('path');
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads')
    },
    filename:(req,file,cb)=>{
        const fileExt=path.extname(file.originalname)
        const filename=fileExt.replace(fileExt,"").toLowerCase().split(".").join("-")+Date.now()
        
        cb(null,filename+fileExt)

    }                                           

})

var upload=multer({
    storage:storage,
    dest:'./uploads',
    limit:{
        fileSize:10000
    },
    fileFilter:(req,file,callback)=>{
        console.log("File Name: "+file.fieldname+" File MIME: "+file.mimetype)
        
        if(file.mimetype==="image/png"|| file.mimetype==="image/jpeg"){
                callback(null,true)
            }
            else{
                callback(new Error("File Format not supported."))
            }
        
    }
})

profile_upload.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/index.html'))
})

profile_upload.post('/upload',upload.fields([
    {name:"profile_pic",max_count:1},
    {name:"other_pic",max_count:2}
]),(req,res)=>{
    
    res.send("UPLOADED")
})

module.exports=profile_upload