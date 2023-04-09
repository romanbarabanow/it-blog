const { Router } = require("express");
const CommentaryController = require("../controllers/CommentaryController");

const router = Router();

router.get("/commentary", CommentaryController.allCommentary);
router.post("/commentary", CommentaryController.addCommentary);
router.delete("/commentary", CommentaryController.removeCommentary);

module.exports = router;
