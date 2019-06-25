const mongoose= require('mongoose');

const userSchema= mongoose.Schema({
   _id:mongoose.Schema.Types.ObjectId,
   firstName:{
      type: String
   },
   lastName:{
      type:String
   },
   mobile:{
      type:String
   },
   email:{ 
      type: String,
      required:true,
      unique:true,
     // match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
   },
   password:{ 
      type:String,
      required:true,
     
   }

});
module.exports=mongoose.model('User',userSchema);