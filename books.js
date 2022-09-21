/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
/* eslint-disable max-classes-per-file */
class Book {
  id='';

  title='';

  author='';

  constructor(param_id, param_title, param_author) {
    this.id = param_id;
    this.title = param_title;
    this.author = param_author;
  }

  generateBookLi(index) {
    return `<li class="book"><span class="book_details">"${this.title
    }" by ${this.author}</span><button class="remove_button" onClick="removeBook(${index})">Remove</button></li>`;
  }
}

class BookPage {
  booklist = [];

  constructor() {

  }

  storeInMemory() {
    localStorage.setItem('pageBooks', JSON.stringify(this.booklist));
  }

  remove(index) {
    this.booklist.splice(index, 1);
    this.storeInMemory();
  }

  addBook(book) {
    this.booklist.push(book);
    // console.log(this.booklist);
    this.storeInMemory();
  }

  refreshBookList() {
    // update the innerhtml value of books
    let response = '';
    this.booklist.forEach((book, index) => {
      response += book.generateBookLi(index);
    });
    document.querySelector('.books').innerHTML = response;
  }

  generateId() {
    return this.booklist.length === 0 ? 1 : this.booklist[this.booklist.length - 1].id + 1;
  }
}

const page = new BookPage();
const title = document.querySelector('.title');
const author = document.querySelector('.author');

function add_new_book(e) {
  e.preventDefault();
  page.addBook(new Book(page.generateId(), title.value, author.value));
  page.refreshBookList();
  title.value = '';
  author.value = '';
}

function removeBook(index) {
  page.remove(index);
  page.refreshBookList();
}

document.querySelector('.submit_button').addEventListener('click', add_new_book);