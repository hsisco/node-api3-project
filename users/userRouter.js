const express = require('express');
const router = express.Router();

const Users = require('../users/userDb');

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
  .then(user => {
    res.status(201).json({ success: "New user created", user })
  })
  .catch(err => {
    res.status(500).json({ errorMessage: "User not created", err })
  })
});

// router.post('/:id/posts', (req, res) => {
//   // do your magic!
// });

router.get('/', (req, res) => {
  Users.get()
    .then(users => {
      res.status(201).json(users)
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Unable to fetch all users", err })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  const { id } = req.params.id
  Users.getById(id)
    .then(user => {
			res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Unable to fetch user by ID", err })
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  const { id } = req.params.id
  Users.getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Unable to fetch user's post", err })
    })
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
