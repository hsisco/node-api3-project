const express = require('express');
const router = express.Router();

const Users = require('../users/userDb');
const Posts = require('../posts/postDb');

// ADD NEW USER
router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
  .then(user => {
    res.status(201).json({ success: "New user created", user })
  })
  .catch(err => {
    res.status(500).json({ errorMessage: "User not created", err })
  })
});

// ADD NEW POST
router.post('/:id/posts', validateUser, validateUserId, (req, res) => {
  const { user_id } = req.params.id;
  const { body } = req.body;
  Posts.insert(user_id, body)
  .then(post => {
    res.status(201).json(post)
  })
  .catch(err => {
    res.status(500).json({ errorMessage: "Unable to add user's new post", error: err})
  })
});

// FETCH ALL USERS
router.get('/', (req, res) => {
  Users.get()
    .then(users => {
      res.status(201).json(users)
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Unable to fetch all users", err })
    })
});

// FETCH USER BY ID
router.get('/:id', validateUserId, (req, res) => {
  const { id } = req.params.id;
  Users.getById(id)
    .then(user => {
			res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Unable to fetch user by ID", err })
    })
});

// FETCH ALL USER'S POSTS
router.get('/:id/posts', validateUserId, (req, res) => {
  const { id } = req.params.id;
  Users.getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Unable to fetch user's post", err })
    })
});

// DELETE USER
router.delete('/:id', validateUserId, (req, res) => {
  const { id } = req.params.id;
  Users.getById(id)
  .then(user => {
    user
      ? Users.remove(id)
        .then(deleted => {
          deleted
            ? res.status(200).json({ success: `User ${id} deleted`, info: user })
            : null
        })
        : null
  })
  .catch(err => {
    res.status(500).json({ errorMessage: "Unable to delete user", err })
  })
});

// UPDATE USER
router.put('/:id', validateUser, validateUserId, (req, res) => {
  const { id } = req.params.id;
  const { body } = req.body;
  Users.update(id, body)
  .then(user => {
    res.status(201).json({ success: "User updated", info: body })
  })
  .catch(err => {
    res.status(500).json({ errorMessage: "Unable to update user", err })
  })
});

//custom middleware

function validateUserId(req, res, next) {
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
  if(!req.body){
    res.status(400).json({ errorMessage: "Missing user data" })
  } else if(!req.body.name){
    res.status(400).json({ errorMessage: "Missing required name field" })
  } else next();
};

module.exports = router;