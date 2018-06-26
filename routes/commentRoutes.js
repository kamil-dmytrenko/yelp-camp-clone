const router = require("express").Router({mergeParams: true});
const middleware = require("../middleware");
const controller = require('../controllers/commentController');

//Comments New
router.get("/new", middleware.isLoggedIn, controller.new);

//Comments Create
router.post("/",middleware.isLoggedIn, controller.create);

router.get("/:commentId/edit", middleware.isLoggedIn, controller.getEditForm);

router.put("/:commentId", controller.editComment);

router.delete("/:commentId",middleware.checkUserComment, controller.deleteComment);

module.exports = router;