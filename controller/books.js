const bookSchema = require('../models/book')


// /api/books

const getAllBooks = async(req, res) => {
//response will be array of book objects
//json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
  console.log('getting all books')
  try{
    let book = await bookSchema.find()
    return res.json(book)
  }catch(e){}
  console.log('error, ', e)
  return res.json({error: e})
}

const createABook = async (req, res) => {
  console.log('creating a book...')
  let title = req.body.title;
  //response will contain new book object including atleast _id and title
  if(!title || title == ''){
    return res.send('missing required field title')
  }
  let book = new bookSchema({title})
  let savedBook = await book.save()
  if(!savedBook){
    return res.send('failed to save book')
  }
  return res.json(savedBook)
}

const deleteAllBooks = (req, res) => {
  //if successful response will be 'complete delete successful'
  console.log('deleting a book....')
  return res.send('deleting a book')
}

// api/books/:id
const getBook = async (req, res) => {
  let _id = req.params.id;
  console.log('getting book: ', _id)
  //json res format: {"_id": bookid, "title": book_title, "comments":   [comment,comment,...]}
  try{
    let book = await bookSchema.findById(_id)
    if(!book) {
      return res.send('no book exists')
    }
    console.log('book found: ', book)
    return res.send(book)
  }catch(e){
    console.log('some error occured')
    return res.send('no book exists')
  }
  
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




