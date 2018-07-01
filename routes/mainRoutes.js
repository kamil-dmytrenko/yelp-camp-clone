const router = require("express").Router();
const passport = require("passport");
const controller = require('../controllers/mainController');

router.route('/')
  //root route
  .get(controller.main);

router.route('/register')
  //handle sign up logic
  .post(controller.signUp);

router.route('/login')
  //handling login logic
  .post(passport.authenticate("local", {
      successRedirect: "back",
      failureRedirect: "back"
    }));

router.route('/logout')
  //logout route
  .get(controller.logout);

module.exports = router;