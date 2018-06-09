const mongoose = require('mongoose');
const travis = 'mongodb://127.0.0.1:27017/SeederTest';
const url = 'mongodb://localhost:27017/SeederTest';
mongoose.connect(process.env.NODE_ENV === 'TRAVIS' ? travis : url);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error'));

module.exports = {
  mongoose,
  db,
};
