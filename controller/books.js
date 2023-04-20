
// /api/books

const getAllBooks = (req, res) => {
//response will be array of book objects
//json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
  console.log('getting all books')
  return res.send('getting all books in controller...')
}

const createABook = (req, res) => {
  console.log('creating a book...')
  let title = req.body.title;
  //response will contain new book object including atleast _id and title
  return res.send('creating a book')
}

const deleteAllBooks = (req, res) => {
  //if successful response will be 'complete delete successful'
  console.log('deleting a book....')
  return res.send('deleting a book')
}

// api/books/:id
const getBook = (req, res) => {
  let bookid = req.params.id;
  console.log('getting book b', bookid)
  //json res format: {"_id": bookid, "title": book_title, "comments":   [comment,comment,...]}
}

const addComment = (req, res) => {
  let bookid = req.params.id;
  let comment = req.body.comment;
  console.log('adding comment')
  console.log(`bookid: ${bookid} , comment: ${comment}`)
  return res.send('sending new comment')
  //json res format same as .get
}


const deleteABook = (req, res) => {
  let bookid = req.params.id;
  //if successful response will be 'delete successful'
  console.log('deleting book ', bookid)
  return res.send('deleting a book ')
}


module.exports = { 
  getAllBooks, 
  createABook, 
  deleteAllBooks, 
  getBook,  
  addComment,
  deleteABook
}




