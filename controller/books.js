const bookSchema = require('../models/book')

// Connect to MongoDB


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
  console.log('deleting all books...')
 bookSchema.collection.drop(function(err) {
  if (err) {
    console.log('Error deleting collection: ' + err);
    return res.send('error deleting')
  } else {
    console.log('Collection deleted');
    return res.send('complete delete successful')
  }
});
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

const addComment = async (req, res) => {
  let _id = req.params.id;
  let comment = req.body.comment;
  console.log('adding comment...')

  if (!_id || _id === ''){
    return res.send('missing required field id')
  }
  if (!comment|| comment === ''){
    return res.send('missing required field comment')
  }
  try{
    let book = await bookSchema.findById(_id)
    book.comments.push(comment)
    book.commentcount++
    let newBook = await book.save()
    console.log('book', newBook)
    return res.json(newBook)
  }catch(e){
    console.log('error: ', e)
    return res.send('no book exists')
  }

 
  return res.send('sending new comment')
  //json res format same as .get
}


const deleteABook = async (req, res) => {
  let _id = req.params.id;
  //if successful response will be 'delete successful'
  console.log('deleting book ', _id)
  try{
    let deletedBook = await bookSchema.deleteOne({_id})
    console.log('deleted: ', deletedBook)
    if (deletedBook.deletedCount == 0){
      return res.send('no book exists')
    }
    return res.send('delete successful')
  }catch(e){
    
  }
}


module.exports = { 
  getAllBooks, 
  createABook, 
  deleteAllBooks, 
  getBook,  
  addComment,
  deleteABook
}




