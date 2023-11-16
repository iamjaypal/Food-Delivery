const express=require('express');
const Router=express.Router();


Router.post('/fooddata',(req,res)=>{

    try {
        // console.log([global.food_items,global.foodCategoryitems]);
        res.send([global.food_items,global.foodCategoryitems]);
    } catch (error) {
        console.log(error.message);
        res.send("Server Error")

    }
})

module.exports=Router;