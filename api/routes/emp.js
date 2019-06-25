const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');
const multer= require('multer');    
var fs = require('fs');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./upload/');
    },
    filename:function(req,file,cb){
        cb(null,  file.originalname);
    }
});
const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
};



const upload= multer({storage:storage,
    limits:{
    fileSize:1024*1024*5

},
fileFilter:fileFilter
});
 
const Employee= require('../model/Employee');
 
router.get('/', (req, res, next) => {
    Employee.find().exec().
    then(docs=>{
        //console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
    
});


router.post('/',upload.single('image'),function (req, res,next){
    console.log(req.file);
    console.log("PATH:",req.file.path);
    console.log(req.body);
    console.log("IMAGE_____---",req.body.image);
    req.body.image =req.file.path;
        var newEmployee = new Employee();
        Employee.create(req.body,function (err, newEmployee) {
            if (err) {
                console.log(err);
                
                
            } else {
                res.json(newEmployee);
            }
        })
    
  
});
// router.post('/',function(res,req,next){
//     var newEmployee=new Employee();
//     Employee.create(req.body,function(err,newEmployee){
//         if(err){
//             console.log(err);
//         }
//         else{
//             res.json(newEmployee);
//         }
//     })
// })



router.get('/:empId', (req, res, next) => {
    const id = req.params.empId;
    console.log("From Get Method",req.body);
    Employee.findById(id)
    .exec()
    .then(doc =>{
        console.log('From database',doc);
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({message:'NOT VALID ENTRY FOUND FOR PROVIDED ID'});
        }
        
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
});


router.put('/:empId',upload.single('image'),function(req, res, next){
    console.log(req.file);
    console.log("PATH:",req.file.path);
    console.log(req.body);
    console.log("IMAGE_____---",req.body.image);
    req.body.image =req.file.path;
    const id = req.params.empId;
    Employee.findByIdAndUpdate({_id:id},req.body).
    then(function(){
        Employee.findOne({_id:id}).then(function(employee){
            res.send(employee);
        });

    });
});




router.delete('/:empId', (req, res, next) => {
   
    const id=req.params.empId;
    console.log("Hit",id);
    Employee.remove({_id:id})
    .exec()
    .then(result =>{
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });

});


module.exports = router;