const passport = require('passport');

const ctrl = {};

ctrl.index = (req, res) => {
  res.render('login', {
    title: 'Login - Asociados Vasquez'
  });
}

ctrl.verify = passport.authenticate('local',{
  successRedirect: "/redirectUrl",
  failureRedirect: "/"
});

ctrl.logout = (req, res) => {
  req.logout();
  res.redirect('/');
}

module.exports = ctrl;