const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');

router.use(cors());
const {PRIVATE_KEY} = require('../config.json')
const {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT
} = require('../constants').STATUS_CODES;

function decodeToken(request){
  const token = request.body.token;
  const userToken = token.replace(/^JWT\s/, '');
  let decodedResponse = null;
  jwt.verify(userToken, PRIVATE_KEY, function(error, decoded) {
    decodedResponse = !error && decoded;
  });
  return decodedResponse;
}

router.post('/createUser', (req, res) =>{  
  const newUser = req.body;
  if(!newUser.email){
    res.status(BAD_REQUEST).send("Must Provide Email") 
  }
  User.findOne({
    email: req.body.email
  }).then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          newUser.password = hash
          User.create(newUser)
            .then(user => {
              res.status(OK).json({ status: user.email + ' Registered!' })
            })
            .catch(err => {
              res.status(BAD_REQUEST).send('error: ' + err);
            })
        })
      } else {
        res.status(CONFLICT).json({ error: ' User already exists' })
      }
    })
    .catch(err => {
      res.status(BAD_REQUEST).send('error: ' + err)
    })
})


router.post('/verify', (req, res) => {
  const userToken = req.body.token.replace(/^JWT\s/, '');
  let response = false;
  jwt.verify(userToken, PRIVATE_KEY, (error, decoded) => {
     response = !error && decoded;
  });
  if(!response) {
    res.sendStatus(UNAUTHORIZED);
  }else{
    response.verified =  true
    res.status(OK).send(response);
  }
})


router.post('/login', (req, res) => {
  const filter = req.body.email ? {email: req.body.email} : {};
  User.findOne(filter)
    .then(user => {
      if(user === null){
        res.status(OK).send(bcrypt.compareSync("", ""));
      }else{
        if(bcrypt.compareSync(req.body.password, user.password)){
          const userToBeSigned = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,

          };
          const jwtOptions = {
            expiresIn: '2h'
          };
          const token = jwt.sign(
            userToBeSigned, PRIVATE_KEY, jwtOptions
          );
          res.status(200).send({isAuthenticated: true, accessLevel: user.accessLevel, token: 'JWT ' +token, id: user._id})
        }else{
          res.status(UNAUTHORIZED).send({isAuthenticated: true, accessLevel: -1});
        }
      }
    })
    .catch((error) => {
      res.status(BAD_REQUEST).send(error);
    })
})

router.post('/getUser',(req,res) => {
  console.log('req', req);
  User.findById(req.body.id) 
    .then((user) => {
      console.log(user)
      res.status(OK).send(user);
    })
    .catch((error) => {
      res.status(BAD_REQUEST).send(error);
    })
})



module.exports = router;
