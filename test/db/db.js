const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/SeederTest';
mongoose.connect(url);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error'));

module.exports = {
  mongoose,
  db,
};
