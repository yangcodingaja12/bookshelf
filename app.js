document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'BOOKSHELF_APP';
    const bookForm = document.getElementById('bookForm');
    const bookTitleInput = document.getElementById('bookTitle');
    const unreadBooks = document.getElementById('unreadBooks');
    const readBooks = document.getElementById('readBooks');
    let books = [];
  
    if (localStorage.getItem(STORAGE_KEY)) {
      books = JSON.parse(localStorage.getItem(STORAGE_KEY));
      console.log('Data buku berhasil dimuat:', books);
      renderBooks();
    }
  
    bookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      addBook(bookTitleInput.value);
      bookTitleInput.value = '';
    });
  
    function addBook(title) {
      const book = {
        id: +new Date(),
        title: title,
        isRead: false,
      };
      books.push(book);
      console.log('Buku berhasil ditambahkan:', book);
      saveBooks();
      renderBooks();
    }
  
    function renderBooks() {
      unreadBooks.innerHTML = '';
      readBooks.innerHTML = '';
  
      books.forEach((book) => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        bookItem.innerHTML = `
          <span>${book.title}</span>
          <div>
            <button class="${book.isRead ? 'undo-btn' : 'done-btn'}">
              ${book.isRead ? 'Belum Selesai' : 'Selesai'}
            </button>
            <button class="delete-btn">Hapus</button>
          </div>
        `;
  
        bookItem.querySelector('.done-btn, .undo-btn').addEventListener('click', () => {
          book.isRead = !book.isRead;
          console.log('Status buku diubah:', book);
          saveBooks();
          renderBooks();
        });
  
        bookItem.querySelector('.delete-btn').addEventListener('click', () => {
          console.log('Buku dihapus:', book);
          books = books.filter((b) => b.id !== book.id);
          saveBooks();
          renderBooks();
        });
  
        if (book.isRead) {
          readBooks.appendChild(bookItem);
        } else {
          unreadBooks.appendChild(bookItem);
        }
      });
    }
  
    function saveBooks() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
      console.log('Data buku berhasil disimpan ke localStorage:', books);
    }
  });
  