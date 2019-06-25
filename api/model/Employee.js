const mongoose= require('mongoose');

const employeeSchema= mongoose.Schema({
    //_id:mongoose.Schema.Types.ObjectId,
    firstName:{
     type:   String
    },
    lastName:{
     type:   String
    },
    email:{
     type: String
    },
    mobile:{
        type:String
    },
    address:{
        type:String
    },
    gender:{
        type:String
    },
    salary:{
        type:Number
    },
    date:{
        type:Date
    },
    state:{
        type:String
    },
    city:{
        type:String
    },
    zip:{
        type:Number
    },
    image:{
        type:String
    },
    hobies:[''],
    skill:['']
});

module.exports=mongoose.model('Employee',employeeSchema);