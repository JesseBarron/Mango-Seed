const { mongoose } = require('./db');

const projecSchema = mongoose.Schema({
  title: String,
  description: String,
  date_created: Date,
  githubURL: String,
  siteURL: String,
  screenshot: String,
});

module.exports = mongoose.model('Project', projecSchema);
