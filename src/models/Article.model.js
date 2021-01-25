const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArticleSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  unid_med: {
    type: String,
    required: true
  },
  marca: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: false,
    default: 0
  },
  precio: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
    default: '/img/placeholder-image.png'
  },
  public_id: {
    type: String,
    required: false,
    default: null
  }
});

module.exports = mongoose.model('Article', ArticleSchema);