const router = require("express").Router({mergeParams: true});
const middleware = require("../middleware");
const controller = require('../controllers/commentController');

//Comments Create
router.post("/",middleware.isLoggedIn, controller.create);

router.delete("/:commentId",middleware.checkUserComment, controller.deleteComment);

module.exports = router;