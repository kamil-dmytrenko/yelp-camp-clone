const router = require("express").Router({mergeParams: true});
const controller = require('../controllers/campController');
const multerService = require('../service/multerService');
const middleware = require("../middleware");



router.route('/')
  .get(controller.getAll)
  .post(middleware.isLoggedIn, multerService.upload.any('image'),controller.addOne);

router.route('/new')
  .get(middleware.isLoggedIn, controller.getCreateForm);

router.route('/:id')
  .get(controller.showOne)
  .delete(controller.deleteOne)
  .put(controller.updateOne);

router.route("/:id/edit")
  .get(middleware.checkUserCampground, controller.getEditForm);

module.exports = router;

