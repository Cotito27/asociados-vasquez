const Article = require('../models/Article.model');
const fs = require('fs-extra');

const ctrl = {};

ctrl.form = (req, res) => {
  res.render('index', {
    title: 'Asociados Vasquez',
    section: 'register-articles',
    user: req.user
  });
}

ctrl.save = async (req, res) => {
  let data = req.body;
  let newArticle = new Article(data);
  let responseB = await newArticle.save();
  await fs.unlink(req.file.path);
  res.send(responseB);
}

ctrl.list = async (req, res) => {
  let valArticles = await Article.find({});
  res.render('index', {
    title: 'Asociados Vasquez',
    section: 'reporte-articles',
    valArticles,
    user: req.user
  });
}

ctrl.edit = async (req, res) => {
  let { id } = req.query;
  let vecData = await Article.findOne({ _id: id });
  let data = {
    name: vecData.nombre,
    desc: vecData.descripcion,
    unid: vecData.unid_med,
    marca: vecData.marca,
    stock: vecData.stock,
    precio: vecData.precio,
    image: vecData.image,
    id,
    user: req.user
  }
  res.render('index', {
    title: 'Asociados Vasquez',
    section: 'edit-articles',
    data
  })
}

ctrl.update = async (req, res) => {
  let id = req.params.id;
  let body = req.body;

  let responseUpdate = await Article.findByIdAndUpdate(id, body);
  await fs.unlink(req.file.path);

  res.send(responseUpdate);
}

ctrl.delete = async (req, res) => {
  let { id } = req.params;
  let responseDelete = await Article.findByIdAndDelete(id);

  res.send(responseDelete);
}

module.exports = ctrl;