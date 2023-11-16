const express=require('express');
const router=express.Router();

const order=require('../Models/Orders');

router.post('/auth/orderData',async (req,res)=>{
    const data=req.body.order_data;
    await data.splice(0,0,{Order_date : req.body.order_date});
    const eId=await order.findOne({'email':req.body.email});
    // console.log("email is :- ",eId);

    if(eId===null){
        try {
            await order.create({
                email : req.body.email,
                order_data : [data]
            }).then(()=>{
                res.json({success : true})
            })
            
        } catch (error) {
            
            res.send('server error',500);

        }
    }
    else{
        try {
            
            await order.findOneAndUpdate({email: req.body.email},
                {
                    $push : {order_data : data}
                }).then(()=>{
                    res.send({success:true})
                })
            

        } catch (error) {
            // console.log('server side error',error);
            res.send(
                'server side error',error.message
            );
        }
    }

})

router.post('/myorderdata',async(req,res)=>{

    try{
    const mydata=await order.findOne({email:req.body.email});
    res.json({orderData:mydata});
    }
    catch(error){
        res.send("Server Error",error.message);
    }


})

module.exports=router;
