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

const storedBooks = JSON.parse(localStorage.getItem('bookss'));

function showBooks() {
  const booksCode = bookss.map((book) => new bookClass(book.title, book.author, book.id).bookCode());
  bookList.innerHTML = booksCode.join('');

  const btn = document.querySelectorAll('.remove');

  btn.forEach((el) => {
    el.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      bookClass.remove(id);
      showBooks();
    });
  });
}

if (storedBooks) {
  bookss = storedBooks;
  showBooks();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (!title || !author) {
    return;
  }
  
  const newBook = new bookClass(title, author);
  bookClass.addBook(newBook);
  showBooks();
  titleInput.value = '';
  authorInput.value = '';
});
