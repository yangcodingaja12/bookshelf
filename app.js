const books = JSON.parse(localStorage.getItem("books")) || [];
const bookForm = document.getElementById("bookForm");
const searchForm = document.getElementById("searchBook");
const incompleteBookList = document.getElementById("incompleteBookList");
const completeBookList = document.getElementById("completeBookList");

function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

function renderBooks(filter = "") {
  incompleteBookList.innerHTML = "";
  completeBookList.innerHTML = "";

  books
    .filter((book) => book.title.toLowerCase().includes(filter.toLowerCase()))
    .forEach((book) => {
      const bookElement = document.createElement("div");
      bookElement.dataset.bookid = book.id;
      bookElement.dataset.testid = "bookItem";

      bookElement.innerHTML = `
        <h3 data-testid="bookItemTitle">${book.title}</h3>
        <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
        <p data-testid="bookItemYear">Tahun: ${book.year}</p>
        <div>
          <button data-testid="bookItemIsCompleteButton">
            ${book.isComplete ? "Belum selesai dibaca" : "Selesai dibaca"}
          </button>
          <button data-testid="bookItemDeleteButton">Hapus Buku</button>
          <button data-testid="bookItemEditButton">Edit Buku</button>
        </div>
      `;

      const toggleButton = bookElement.querySelector(
        "[data-testid='bookItemIsCompleteButton']"
      );
      const deleteButton = bookElement.querySelector(
        "[data-testid='bookItemDeleteButton']"
      );
      const editButton = bookElement.querySelector(
        "[data-testid='bookItemEditButton']"
      );

      toggleButton.addEventListener("click", () => toggleBook(book.id));
      deleteButton.addEventListener("click", () => deleteBook(book.id));
      editButton.addEventListener("click", () => editBook(book.id));

      if (book.isComplete) {
        completeBookList.appendChild(bookElement);
      } else {
        incompleteBookList.appendChild(bookElement);
      }
    });
}

function addBook(event) {
  event.preventDefault();
  const title = document.getElementById("bookFormTitle").value;
  const author = document.getElementById("bookFormAuthor").value;
  const year = document.getElementById("bookFormYear").value;
  const isComplete = document.getElementById("bookFormIsComplete").checked;

  books.push({
    id: +new Date(),
    title,
    author,
    year,
    isComplete,
  });

  saveBooks();
  renderBooks();
  bookForm.reset();
}

function toggleBook(id) {
  const book = books.find((book) => book.id === id);
  book.isComplete = !book.isComplete;
  saveBooks();
  renderBooks();
}

function deleteBook(id) {
  const index = books.findIndex((book) => book.id === id);
  books.splice(index, 1);
  saveBooks();
  renderBooks();
}

function editBook(id) {
  const book = books.find((book) => book.id === id);
  document.getElementById("bookFormTitle").value = book.title;
  document.getElementById("bookFormAuthor").value = book.author;
  document.getElementById("bookFormYear").value = book.year;
  document.getElementById("bookFormIsComplete").checked = book.isComplete;

  deleteBook(id);
}

function searchBooks(event) {
  event.preventDefault();
  const query = document.getElementById("searchBookTitle").value;
  renderBooks(query);
}

bookForm.addEventListener("submit", addBook);
searchForm.addEventListener("submit", searchBooks);

// Render initial data
renderBooks();
