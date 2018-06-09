const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/SeederTest';
mongoose.connect(url);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error'));

module.exports = {
  mongoose,
  db,
};
