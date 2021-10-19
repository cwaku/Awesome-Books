const bookList = document.querySelector('.books');
const form = document.getElementById('newBook');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');

let bookss = [];

let storedBooks = JSON.parse(localStorage.getItem('bookss'))



function singleBook(book) {
  return `<li>
      <p>${book.title}</p>
      <p>${book.author}</p>
      <button type="button" data-id='${book.id}' class="remove">remove</button>
      <hr>
    </li>`;
}

function removeBook() {
  const btn = document.querySelectorAll('.remove');

  btn.forEach((el) => {
    el.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id')
      bookss = bookss.filter((b) => b.id !== Number(id));
      localStorage.setItem('bookss', JSON.stringify(bookss));
      showBooks();
    });
  });
}
