const router = require("express").Router({mergeParams: true});
const middleware = require("../middleware");
const controller = require('../controllers/campController');

router.route('/')
  .get(controller.getAll)
  .post(middleware.isLoggedIn, controller.addOne);

router.route('/new')
  .get(middleware.isLoggedIn, controller.getCreateForm);

router.route('/id')
  .get(controller.showOne)
  .put(controller.updateOne);

router.route("/:id/edit")
  .get(middleware.checkUserCampground, controller.getEditForm);

module.exports = router;

