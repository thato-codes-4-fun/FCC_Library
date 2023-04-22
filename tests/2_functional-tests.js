/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const bookSchema = require('../models/book')

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done) {
    chai.request(server)
      .get('/api/books')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {

      test('Test POST /api/books with title', function(done) {
        let data = {
          title: 'Testing for post'
        }
        chai
          .request(server)
          .post('/api/books/')
          .send(data)
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.equal(res.body.title, data.title)
            //assert.property(res.body[0], 'title')
            done()
          })
      });

      test('Test POST /api/books with no title given', function(done) {
        let data = {
          notitle: 'error no title'
        }
        chai
          .request(server)
          .post('/api/books')
          .send(data)
          .end(function(err, res) {
            assert.equal(res.status, 200)
            assert.equal(res.text, 'missing required field title')
            done()
          })
      });

    });


    suite('GET /api/books => array of books', function() {

      test('Test GET /api/books', function(done) {
        chai
          .request(server)
          .get('/api/books')
          .end(function(err, res) {
            assert.equal(res.status, 200)
            // assert(Array.isArray(res.body))]
            assert.isArray(res.body, 'should be an array')
            done()
          })
      });

    });


    suite('GET /api/books/[id] => book object with [id]', function() {

      test('Test GET /api/books/[id] with id not in db', function(done) {
        //done();
        chai
          .request(server)
          .get('/api/books/id=idnotfound')
          .end(function(err,res){
            assert.equal(res.status, 200)
            assert.equal(res.text, 'no book exists')
            done()
          })
      });

      test('Test GET /api/books/[id] with valid id in db', function(done) {
        //done();
        chai
        .request(server)
        .get('/api/books/6443dfaf55a13f061f36df88')
        .end(function(err, res){
          assert.equal(res.status, 200)
          assert.property(res.body, 'title', 'should contain a titlle')
          done()
        })
      });

    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function() {

      test('Test POST /api/books/[id] with comment', function(done) {
        //done();
        let comment = {
          comment: 'comment added...'
        }
        chai
        .request(server)
        .post('/api/books/6443dfaf55a13f061f36df88')
        .send(comment)
        .end(function(err, res){
          assert.equal(res.status, 200)
          assert.property(res.body, 'comments', 'should have comment')
          done()
        })
      });

      test('Test POST /api/books/[id] without comment field', function(done) {
        //done();
        chai
        .request(server)
        .post('/api/books/6443dfaf55a13f061f36df88')
        .end(function(err, res){
          assert.equal(res.status, 200)
          assert.equal(res.text, 'missing required field comment')
          done()
        })
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done) {
        //done();
        let data = {
          comment: 'comment to be added'
        }
        chai
        .request(server)
        .post('/api/books/6443c976d0d9f7ea835c37d8')
        .send(data)
        .end(function(err, res){
          assert.equal(res.status, 200)
          assert.equal(res.text, 'no book exists')
          done()
        })
      });

    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done) {
        //done();
        let newbook = new bookSchema({title: 'created to delete'})
        let id = newbook._id
        chai
        .request(server)
        .delete(`/api/books/${id}`)
        .end(function(err, res){
          assert.equal(res.status, 200)
          done()
        })
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done) {
        //done();
        chai
        .request(server)
        .delete('/api/books/6443dfaf55a13f061f36df56')
        .end(function(err, res){
          assert.equal(res.status, 200)
          assert.equal(res.text, 'no book exists')
          done()
        })
      });

    });

  });

});


after(function() {
  chai.request(server)
    .get('/')
});

