const express=require('express');
var router=express.Router();
const clinet=require('./Db');
const mongo=require('mongodb');
const multer=require('multer');

router.get('/',(req,res)=>{
    res.json("Hello");
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
})

let upload=multer({storage:storage}).single('myFile')

router.post('/AddClient',(req,res)=>{
    console.log(req.body)
    upload(req,res,function(err){
        if(err)
        {
            return res.status(500).json(err);
        }
        else{
            clinet.connect((err,db)=>{
                if(err)
                {
                    res.json({status:false,err:err});
                }
                else{
                    let dbname=db.db('testimonial');
                    dbname.collection('testimonial').insertOne({...req.body,image:req.file.filename}).then((result)=>{
                        res.json(result.insertedId);
                    });
                }
            })
            
        }
    })
})

router.get('/getEmployee',(req,res)=>{
    clinet.connect((err,db)=>{
        if(err)
        {
            res.json({status:false,err:err});
        }
        else{
            let dbname=db.db('testimonial');
            dbname.collection('testimonial').find({active:"true" }).toArray((err,result)=>{
                if(err)
                {
                    res.json("Error");
                }
                else{
                    res.json(result);
                }
            })
        }
    })
})

router.post('/UpdateClient',(req,res)=>{
    clinet.connect((err,db)=>{
        if(err)
        {
            res.json({status:false,err:err});
        }
        else{
            let dbname=db.db('testimonial');
            dbname.collection('testimonial').insertOne(req.body).then((result)=>{
                res.json(result.insertedId);
            });
        }
    })
})

router.post('/deleteClinet',(req,res)=>{
    let dbName=clinet.db('testimonial');
    dbName.collection('testimonial').updateOne({_id:new mongo.ObjectId(req.body.id)},{$set:{"active":false,last_updated_on:new Date()}}).then((result)=>{
        res.json({staus:true,msg:"account delete successfully"})
    }).catch((e)=>{
        res.json(e);
    })
})

router.post('/updateAccount',(req,res)=>{
    let dbName=clinet.db('testimonial');
    dbName.collection('testimonial').updateOne({_id:new mongo.ObjectId(req.body.id)},{$set:req.body}).then((result)=>{
        res.json("account update successfully")
    }).catch((e)=>{
        res.json(e);
    })
})

module.exports=router;