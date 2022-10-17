const express = require("express");
const router = new express.Router();
const multer = require('multer')
const path = require("path")

const File=require("../model/Files")

const storage = multer.diskStorage({
    destination: "files/",
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})
const uploader = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const suppatedImage = /png|jpg|webp|pdf|audio|video/;
        const extension = path.extname(file.originalname)

        if (suppatedImage.test(extension)) {
            cb(null, true);
        } else {
            cb(new Error("Must be  file"));
        }
    },
    limits: {
        fieldSize: 5000000,
    }
})

const upload = multer({
    storage:storage,
    files:uploader
});

router.post("/upload_file",upload.single("my_file"),async(req,res)=>{

    const {filename} = req.file;

    const {fname} = req.body;

    if(! fname || !filename){
        res.status(401).json({status:401,message:"fill all the data"})
    }
    try {
        const userdata = new File({
            fname:fname,
            filepath:filename,
        });
        const finaldata = await userdata.save();
        res.status(201).json({status:201,finaldata});
    } catch (error) {
        res.status(401).json({status:401,error})
    }
});

router.get("/get_upload_file",async(req,res)=>{
    try {
        const getFile = await File.find();

        res.status(201).json({status:201,getFile})
    } catch (error) {
        res.status(401).json({status:401,error})
    }
});

module.exports = router;