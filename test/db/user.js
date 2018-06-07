const { mongoose } = require('./db');

const userSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    default: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', userSchema);
