const ctrl = {};

ctrl.index = (req, res) => {
 res.redirect('/login');
}

ctrl.redirectUrl = (req, res) => {
  // console.log('xd');
  var redirectTo = req.session.redirectTo ? req.session.redirectTo : '/formArticles';
  delete req.session.redirectTo;
  // is authenticated ?
  console.log(redirectTo);
  res.redirect(redirectTo || '/formArticles');
}

module.exports = ctrl;