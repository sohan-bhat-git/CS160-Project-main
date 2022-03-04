const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const User = require('../models/User');
const {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT
} = require('../constants').STATUS_CODES;

router.post('/createListing', (req, res) => {
  const newListing = req.body;
  User.findById(newListing.creator)
    .then((user) => {
      if(!user){
        res.status(BAD_REQUEST).send("Creator id invalid");    
      }else{
        Listing.create(newListing)
        .then((listing) => {
          User.findByIdAndUpdate( newListing.creator, {$push: {"listings": listing.id}})
            .then((response) => {
              res.status(OK).send(response)
            })
            .catch((error) => {
              res.status(BAD_REQUEST).send("Unable to update user listings " + error);
            })
            
    
          res.status(OK).send(listing.name);
        })
        .catch((err) => {
          res.status(BAD_REQUEST).send(err);
        })
      }
    })
    .catch((err) => {
      res.status(BAD_REQUEST).send("Unable to find user " + err);    

    })

 
})

router.post('/deleteListing', (req, res) => {
  const deleteListing = req.body;

  Listing.findByIdAndDelete(deleteListing.id)
    .then((response) => {
      res.status(OK).send(response);
    })
    .catch((err) => {
      res.status(BAD_REQUEST).send(err);
    })
})

router.get('/getListings', (req, res) => {
  Listing.find({bought: null})
    .then((listings) => {
      res.status(OK).send(listings)
    })
})

router.post('/getOneListing', (req, res) => {
  Listing.findById(req.body.id)
    .then((listing) => {
      res.status(OK).send(listing)
    })
    .catch((err) => {
      res.status(BAD_REQUEST).send(err);
    });
})


router.post('/editListing', (req, res) => {
  const newListing = req.body;
  Listing.findByIdAndUpdate(newListing.id, newListing)
    .then(() => {
      res.status(OK).send("Edit Successful");
    })
    .catch((err) => {
      res.status(BAD_REQUEST).send(err);
    });

})




module.exports = router;
