const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  commentcount: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Array,
    default: []
  },
});

const BookModel = mongoose.model('BookModel', BookSchema);

module.exports = BookModel