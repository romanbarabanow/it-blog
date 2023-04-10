const { Router } = require("express");
const PostController = require("../controllers/PostController");
const middleware = require("../middleware/auth.middleware");

const router = Router();

router.get("/post", middleware, PostController.allPost);
router.post("/post", middleware, PostController.createPost);
router.get("/post/profile", middleware, PostController.profilePost);
router.get("/post/user", middleware, PostController.userPost);
router.delete("/post", middleware, PostController.deletePost);
router.patch("/post", middleware, PostController.updatePost);
router.post("/post/like", middleware, PostController.likePost);
router.post("/post/dislike", middleware, PostController.unlikePost);

module.exports = router;
