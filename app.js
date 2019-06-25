const express =require('express');
const app= express();
const morgan= require('morgan');
const bodyPaser=require('body-parser');
const mongoose= require('mongoose');        
const cors= require('cors')
const employeeRoutes = require('../employee/api/routes/emp');
const userRoutes= require('../employee/api/routes/user')
    
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/MyEmployee',{ useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.use(morgan('dev')); 
app.use('/upload',express.static('upload'));
app.use(bodyPaser.urlencoded({extended:false}));
app.use(bodyPaser.json());


app.use('/emp',employeeRoutes);
app.use('/user',userRoutes);






// app.use((req,res,next)=>{
//     const error=new Error('NOT FOUND');
//     error.status=404;
//     next(error);
    
// })
// app.use((error,res,next)=>{
//     res.status(error.status || 500);
//     res.json({
//         error:{
//             message: error.message
//         }

//     });
// });

app.listen('3001', function(){
    console.log('Server Start At port 3001');
})