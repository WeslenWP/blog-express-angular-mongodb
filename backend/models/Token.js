const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Token = new Schema({
  refreshToken: String
});

mongoose.model('tokens', Token);