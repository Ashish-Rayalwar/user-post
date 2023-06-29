const { verifyToken, verifyTokenAndAuthorization } = require("../auth/auth");
const {
  createPost,
  getPosts,
  editPost,
  deletePost,
} = require("../controllers/postController");
const router = require("express").Router();

router.post("/", verifyToken, createPost);
router.get("/", verifyToken, getPosts);
router.put("/:postId", verifyTokenAndAuthorization, editPost);
router.delete("/:postId", verifyTokenAndAuthorization, deletePost);

module.exports = router;
