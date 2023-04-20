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
  deleteAllBook,
  getBook,
  addComment,
  deleteABook
} = require('../controller/books')

  app.route('/api/books')
    .get(getAllBooks)
    
    .post(createABook)
    
    .delete(deleteABook);

  app.route('/api/books/:id')
    .get(getBook)
    
    .post(addComment)
    
    .delete(deleteABook);
  
};
