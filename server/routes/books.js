// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  //console.log(books);
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      console.log(books);
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });
  //console.log(books);
});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    
    res.render('books/add',{
        title: 'Add New Book'
    });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

      console.log(req.body);
      let addBook = book({

        "Title": req.body.title,
        "Price": req.body.price,
        "Author": req.body.author,
        "Genre": req.body.genre
      });
      book.create(addBook, (err, book)=> {
        if(err){

          console.log(err);
          res.end(error);
        }
        else{

          res.redirect('/books');
        }

      });


});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
  
    let id = req.params.id;

    console.log(id);
    book.findById(id, (err, bookObject) => {

        if(err){
            console.log(err);
            res.end(err);
        }
        else{
          console.log(bookObject);

          res.render('books/details',{
              title: 'Update Book',
              books: bookObject

          });
        }

    });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
    let id = req.params.id;
    let updateBook = book({
      "_id":id,
      "Title": req.body.title,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre

    });
    book.update({ _id: id}, updateBook, (err) => {

        if(err){

          console.log(err);
          res.end(err);
        }
        else{
          res.redirect('/books');
        }
    })

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {


    let id = req.params.id;
    book.remove({_id: id}, (err) => {

      if(err){

        console.log(err);
        res.end(err);

      }
      else{

        res.redirect('/books');
      }


    });
});


module.exports = router;
