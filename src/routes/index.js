const express = require("express");
const router = express.Router();
const passport = require("passport");

function validarUser(req, res, next) {
  // console.log(req.session);
  if (req.isAuthenticated()) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=1, pre-check=0');
    return next();
  }
  // const sessionId =req.path.replace('/session/', '');
  // const veriSession = sessionsRoom.filter((v) => v==sessionId);
  // if(veriSession.length > 0) {
  //   req.session.redirectTo = req.path;
  // }

  // console.log(req);
  // let parseQuery = req.url;
  // if(parseQuery)
  // res.redirect(`/login?url=${req.path}`);
  req.session.redirectTo = req.path;
  res.redirect("/login");
}

function redirectHome(req, res, next) {
  if (req.isAuthenticated()) return res.redirect("/");
  next();
}

// Controllers
const home = require("../controllers/home.controller");
const article = require('../controllers/articulos.controller');
const image = require('../controllers/image.controller');
const login = require('../controllers/login.controller');

router.get('/', home.index);
router.get('/formArticles', validarUser, article.form)
router.post('/saveArticle', article.save);
router.post('/saveImage', image.downloadImage);
router.post('/saveImageExtern', image.downloadImgExtern);
router.get('/listArticles', validarUser, article.list);
router.get('/editArticle', validarUser, article.edit);
router.post('/updateArticle/:id', article.update);
router.get('/deleteArticle/:id', validarUser, article.delete);
router.get('/login', login.index);
router.post('/verifyLogin', login.verify);
router.get('/logout', login.logout);
router.get('/redirectUrl', home.redirectUrl);

module.exports = { router };
