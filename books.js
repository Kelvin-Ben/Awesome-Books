import Book from './book.js';

class BookPage {
  booklist = [];

  storeInMemory() {
    localStorage.setItem('pageBooks', JSON.stringify(this.booklist));
  }

  remove(index) {
    this.booklist.splice(index, 1);
    this.storeInMemory();
  }

  addBook(book) {
    this.booklist.push(book);
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

function addnewbook(e) {
  e.preventDefault();
  page.addBook(new Book(page.generateId(), title.value, author.value));
  page.refreshBookList();
  title.value = '';
  author.value = '';
}

function removeBook(index) {
  if (index >= 0) {
    page.remove(index);
    page.refreshBookList();
  }
}
removeBook(-2);
document.querySelector('.submit_button').addEventListener('click', addnewbook);
document.querySelector('.remove_button').array.forEach(element => {
  element.addEventListener('click',removeBook())
});;
