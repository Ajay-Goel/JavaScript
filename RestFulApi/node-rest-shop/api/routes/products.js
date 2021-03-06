const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');

router.get('/',(req,res,next)=>{
    // res.status(200).json({
    //     messge:'Handling GET requests to /products'
    // });
    Product.find()
    .exec()
    .then(docs =>{
        console.log(docs);
        res.status(200).json(docs);
        // if(docs.length>=0){
        //     res.status(200).json(docs);
        // } else {
        //     res.status(404).json({
        //         message:'No enteries found'
        //     });
        // }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.post('/',(req,res,next)=>{
    const product = {
        name:req.body.name,
        price:req.body.price
    };
    const product1 = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    });
    product1.save()
    .then(result =>{
        console.log(result);
        res.status(201).json({
            messge:'Handling POST requests to /products',
            createdProduct : result
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc=>{
        console.log(doc);
        if(doc){
            res.status(200).json(doc);
        } else {
            res.status(404).json({message:'No Valid entry found for provided ID'});
        }
        
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
    // if(id=='special'){
    //     res.status(200).json({
    //         message:'You discovered the special ID',
    //         id : id
    //     });
    // } else {
    //     res.status(200).json({
    //         message: 'You passed an ID'
    //     });
    // }
});

router.patch('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id : id},{$set: updateOps})
    .exec()
    .then(result =>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
        // res.status(200).json({
        //     message:'UPDATED PRODUCT'
        // });
});

router.delete('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    Product.remove({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
    // res.status(200).json({
    //     message:'Deleted PRODUCT'
    // });
});

module.exports = router;