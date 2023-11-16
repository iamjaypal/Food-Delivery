const express=require('express');
const app=express();
const port=5000;
const bodyParser=require('body-parser')
const MongoDB=require('./Index');
const cors=require('cors')
app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());

MongoDB();
app.use((req,res,next)=>{
   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000") ;
   res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
   );
   
   next();

})

const {body, validationResult}=require('express-validator');
const user=require('./Models/User')


app.use('/api',require('./Routes/CreateUser'))
app.use('/api',require('./Routes/OrderData'))
app.use('/api',require('./Routes/Displaydata'))
app.listen(port,()=>{
    console.log(`app is listing on port ${port}`);
    // console.log(`app address is ${server.address().address}`);
})