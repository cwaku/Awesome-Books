const bookList = document.querySelector(".books");
const form = document.getElementById("newBook");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");

let bookss = [];

let storedBooks = JSON.parse(localStorage.getItem("bookss"));

function singleBook(book) {
  return `<li>
      <p>${book.title}</p>
      <p>${book.author}</p>
      <button type="button" data-id='${book.id}' class="remove">remove</button>
      <hr>
    </li>`;
}

function removeBook() {
  const btn = document.querySelectorAll(".remove");

  btn.forEach((el) => {
    el.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      bookss = bookss.filter((b) => b.id !== Number(id));
      localStorage.setItem("bookss", JSON.stringify(bookss));
      showBooks();
    });
  });
}

if (storedBooks) {
  bookss = storedBooks;
  showBooks();
}

function showBooks() {
  const booksCode = bookss.map((book) => singleBook(book));
  bookList.innerHTML = booksCode.join("");

  removeBook();
  console.log(bookss);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  console.log(title);
  const author = authorInput.value.trim();
  let id = 1;
  if (bookss.length > 0) {
    id = bookss[bookss.length - 1].id + 1;
    console.log(id);
  }
  if (!title || !author) {
    console.log("none");
    return;
  }
  bookss.push({
    id,
    title,
    author,
  });
  console.log(bookss);
  showBooks();
  localStorage.setItem("bookss", JSON.stringify(bookss));
  console.log(localStorage.getItem("bookss"));
  titleInput.value = "";
  authorInput.value = "";
});
