/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

module.exports = function (app) {
let { 
  getAllBooks,
  createABook,
  deleteAllBooks,
  getBook,
  addComment,
  deleteABook
} = require('../controller/books')

  app.route('/api/books')
    .get(getAllBooks)
    
    .post(createABook)
    
    .delete(deleteAllBooks);

  app.route('/api/books/:id')
    .get(getBook)
    
    .post(addComment)
    
    .delete(deleteABook);
  
};
