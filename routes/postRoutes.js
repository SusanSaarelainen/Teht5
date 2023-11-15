const express = require("express");
const postControllers = require("../controllers/postControllers");
const router = express.Router();

//@route GET && POST - /posts/
router
  .route("/")
  .get(postControllers.getAllPosts)
  .post(postControllers.createNewPost);

router.route("/:id").get(postControllers.getPostById);

// delete ja update

router
  .route("/:id")
  .get(postControllers.getPostById)
  .delete(postControllers.deleteWithId);

router
  .route("/:id")
  .get(postControllers.getPostById)
  .put(postControllers.updateWithId);

module.exports = router;
