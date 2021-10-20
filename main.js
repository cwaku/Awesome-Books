const bookList = document.querySelector('.books');
const form = document.getElementById('newBook');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');

let bookss = [];

class bookClass {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id
  }

  bookCode() {
    return `<li>
    <p>${this.title}</p>
    <p>${this.author}</p>
    <button type="button" data-id='${this.id}' class="remove">remove</button>
    <hr>
  </li>`;
  }

  static addBook(book) {
    let id = 1;
  if (bookss.length > 0) {
    id = bookss[bookss.length - 1].id + 1; //bookss not dfined yet
  }
  book.id = id;
  bookss.push(book);
  localStorage.setItem('bookss', JSON.stringify(bookss));
}

  static remove(id) {
    //same as addBook
    bookss = bookss.filter((b) => b.id !== Number(id));
    localStorage.setItem('bookss', JSON.stringify(bookss));
  }
}





