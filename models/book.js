const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  name: String,
  commentcount: Number,
  
});