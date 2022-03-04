const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName:{
      type:String,
      required: true
    },
    lastName:{
      type: String,
      required: true
    },

    email:{
      type: String,
      required: true
    },
    password:{
      type: String,
      required: true
    },
    address:{
      type: String,
      required: true
    },
    payment:{
      type: String,
      required: true
    },
    listings:{
      type: [Schema.Types.ObjectId],
    },
    bought: [
      {type: [Schema.Types.ObjectId]}
    ]
    
  }
)



module.exports = mongoose.model('User', UserSchema)