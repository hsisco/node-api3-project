const express = require('express');
const router = express.Router();

const Posts = require('../posts/postDb');
const Users = require('../users/userDb');

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const { id } = req.params.id;

  Posts.getById(id)
  .then(post => {
    if(post !== undefined){
      req.post = post
    } else {
      res.status(400).json({ errorMessage: "Invalid post id", err })
    }
  });
  next();
}

function validatePost(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(400).json({ errorMessage: "Missing post data" })
  } else if(!req.body.name){
    res.status(400).json({ errorMessage: "Missing required text field" })
  } else next();
}

module.exports = router;
