const router = require("express").Router();
const passport = require("passport");
const controller = require('../controllers/mainController');

router.route('/')
  //root route
  .get(controller.main);

router.route('/register')
  //show register form
  .get(controller.register)
  //handle sign up logic
  .post(controller.signUp);

router.route('/login')
  //show login form
  .get(controller.showLogin)
  //handling login logic
  .post(passport.authenticate("local", {
      successRedirect: "/campgrounds",
      failureRedirect: "/login"
    }));

router.route('/logout')
  //logout route
  .get(controller.logout);

module.exports = router;