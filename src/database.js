const mongoose = require('mongoose');

mongoose.connect(process.env.URL_MONGODB || 'mongodb://localhost/vasquezProducts', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));