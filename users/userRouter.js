const express = require('express');
const router = express.Router();

const Users = require('../users/userDb');

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params.id;

  Users.getById(id)
  .then(user => {
    if(user !== undefined){
      req.user = user
    } else {
      res.status(400).json({ errorMessage: "Invalid user id", err })
    }
  });
  next();
};

function validateUser(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(400).json({ errorMessage: "Missing user data" })
  } else if(!req.body.name){
    res.status(400).json({ errorMessage: "Missing required name field" })
  } else next();
};

module.exports = router;
