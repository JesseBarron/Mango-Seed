const { mongoose } = require('./db');

const articleSchema = mongoose.Schema({
  title: String,
  body: String,
  date_created: Date,
});

module.exports = mongoose.model('Article', articleSchema);
