// Mendapatkan elemen-elemen DOM
const addBookBtn = document.getElementById('addBookBtn');
const bookTitleInput = document.getElementById('bookTitle');
const bookList = document.getElementById('bookList');

// Memuat buku dari localStorage saat halaman dimuat
let books = JSON.parse(localStorage.getItem('books')) || [];

// Fungsi untuk menampilkan buku-buku
function renderBooks(status) {
    const filteredBooks = books.filter(book => book.status === status || status === 'all');
    bookList.innerHTML = '';

    filteredBooks.forEach((book, index) => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');
        bookElement.innerHTML = `
            <h3>${book.title}</h3>
            <p>Status: <span class="status ${book.status}">${book.status === 'read' ? 'Sudah Dibaca' : 'Belum Dibaca'}</span></p>
            <button onclick="deleteBook(${index})">Hapus</button>
            <button onclick="toggleStatus(${index})">${book.status === 'read' ? 'Tandai Belum Dibaca' : 'Tandai Sudah Dibaca'}</button>
        `;
        bookList.appendChild(bookElement);
    });
}

// Fungsi untuk menambahkan buku baru
addBookBtn.addEventListener('click', () => {
    const title = bookTitleInput.value.trim();
    if (title) {
        const newBook = {
            title,
            status: 'unread',
        };
        books.push(newBook);
        localStorage.setItem('books', JSON.stringify(books));  // Menyimpan ke localStorage
        renderBooks('all'); // Memperbarui tampilan buku
        bookTitleInput.value = ''; // Kosongkan input
    }
});

// Fungsi untuk menghapus buku
function deleteBook(index) {
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));  // Update localStorage setelah dihapus
    renderBooks('all'); // Memperbarui tampilan
}

// Fungsi untuk mengubah status buku
function toggleStatus(index) {
    books[index].status = books[index].status === 'read' ? 'unread' : 'read';
    localStorage.setItem('books', JSON.stringify(books));  // Update status di localStorage
    renderBooks('all'); // Memperbarui tampilan
}

// Fungsi untuk menampilkan buku berdasarkan status
function showBooks(status) {
    renderBooks(status);
}

// Render buku saat halaman dimuat
renderBooks('all');
