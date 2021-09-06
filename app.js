'use strict';
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const publisher = document.querySelector('#publisher');
const btnAdd = document.querySelector('.add');
const bookList = document.querySelector('#book-list');
const form = document.querySelector('#book-form');
const section = document.querySelector('.section');
let book;

class Book {
  constructor(title, author, publisher) {
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.addBook();
  }

  addBook() {
    const bookHtml = `
    <tr class="${this.title}">
    <td>${this.title}</td>
    <td>${this.author}</td>
    <td>${this.publisher}</td>
    <td>
      <button type="button" class="btn btn-danger delete">Delete</button>
    </td>
  </tr>`;
    bookList.insertAdjacentHTML('afterbegin', bookHtml);
    this.createWarning('Added', 'success');
    this.clearInput();
  }

  deleteBook(e) {
    if (e.target.classList.contains('delete')) {
      e.target.parentElement.parentElement.remove();
    }
    this.createWarning('Deleted', 'danger');
  }

  createWarning(text, status) {
    if (document.querySelector('.alert')) return;

    const warningHtml = `
    <div class="mt-2 text-center font-weight-bold alert alert-${status}" role="alert">
      Book ${text}
    </div>`;
    btnAdd.insertAdjacentHTML('afterend', warningHtml);
    this.deleteWarning(status);
  }

  deleteWarning(status) {
    setTimeout(() => {
      document.querySelector(`.alert-${status}`).remove();
    }, 2000);
  }

  clearInput() {
    title.value = '';
    author.value = '';
    publisher.value = '';
  }
}

btnAdd.addEventListener('click', () => {
  if (title.value && author.value && publisher.value) {
    book = new Book(title.value, author.value, publisher.value);
  }
});

section.addEventListener('click', event => {
  book.deleteBook(event);
});
