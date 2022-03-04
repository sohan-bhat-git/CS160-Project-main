const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./User');

const ListingSchema = new Schema( 
  {
    name:{
      type: String,
      required: true
    },
    price:{
      type: Number,
      required: true 
    },
    picture: {
      type: String,
      required: true
    },
    buyer:{
      type: Schema.Types.ObjectId,
    },
    creator:{
      type: Schema.Types.ObjectId,
      required: true
    },
    console:{
      type: String,
      required: true
    }
  }
);

ListingSchema.pre('findByIdAndDelete', { document: true, query: false}, function(next) {
  // get the list of users in order to delete tag from their tags array
  User.find({ '_id': { $in: this.users}}, (error, users) => {
      if(error) 
          return res.status(BAD_REQUEST).send({ message: 'Bad Request'});
      users.forEach((user, index) => {
          user.listings.pull(this.id);
          user.save();
      })
  })
  next()
});

module.exports = mongoose.model('Listing', ListingSchema)