const express = require('express');
const router = express.Router();

const Posts = require('../posts/postDb');

// FETCH ALL POSTS
router.get('/', (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(201).json(posts)
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Unable to fetch all posts", err })
    })
});

// FETCH POST BY ID
router.get('/:id', validatePostId, (req, res) => {
  const { id } = req.params.id;
  Posts.getById(id)
    .then(post => {
			res.status(200).json(post)
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Unable to fetch user by ID", err })
    })
});

// DELETE POST
router.delete('/:id', validatePostId, (req, res) => {
  const { id } = req.params.id;
  Posts.getById(id)
  .then(post => {
    post
      ? Posts.remove(id)
        .then(deleted => {
          deleted
            ? res.status(200).json({ success: `Post ${id} deleted`, info: post })
            : null
        })
        : null
  })
  .catch(err => {
    res.status(500).json({ errorMessage: "Unable to delete post", err })
  })
});

// UPDATE POST
router.put('/:id', validatePostId, (req, res) => {
  const { id } = req.params.id;
  const { body } = req.body;
  Posts.update(id, body)
  .then(post => {
    res.status(201).json({ success: "Post updated", info: body })
  })
  .catch(err => {
    res.status(500).json({ errorMessage: "Unable to update post", err })
  })
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params.id;
  Posts.getById(id)
  .then(post => {
    post
      ? req.post
      : res.status(400).json({ errorMessage: "Invalid post id", err })
  });
  next();
}

module.exports = router;