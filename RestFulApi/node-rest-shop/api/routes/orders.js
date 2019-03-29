const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        messge:'orders were fetched'
    });
});

router.post('/',(req,res,next)=>{
    const order = {
        productId:req.body.productId,
        quantity : req.body.quantity
    };

    res.status(201).json({
        messge:'orders were created',
        order : order
    });
});

router.get('/:orderId',(req,res,next)=>{
    res.status(200).json({
        messge:'orders were fetched',
        orderId: req.params.orderId
    });
});

router.delete('/:orderId',(req,res,next)=>{
    res.status(200).json({
        messge:'orders were deleted',
        orderId: req.params.orderId
    });
});



module.exports = router;