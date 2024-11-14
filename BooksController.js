const books = [];
const generateUUID = require('./uuid');
const responseHandler = require('./ResponseHandler');

// Utility function for error response
const errorResponse = (h, message, statusCode) => {
    return h.response({
        status: 'fail',
        message: message,
    }).code(statusCode);
};

const getAllBooks = (request, h) => {
    return h.response({
        status: 'success',
        data: {
        books: books.map((b) => ({
            id: b.id,
            name: b.name,
            publisher: b.publisher,
        })),
        },
    }).code(200);
};

const getBookById = (request, h) => {
    const { id } = request.params;
    const book = books.find((b) => b.id === id);
    if (!book) {
        return errorResponse(h, 'Buku tidak ditemukan', 404);
    }
    return h.response({
        status: 'success',
        data: {
        book,
        },
    }).code(200);
};

const addBook = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    // Check if name is missing
    if (!name) {
        return errorResponse(h, 'Gagal menambahkan buku. Mohon isi nama buku', 400);
    }

    // Check if readPage is greater than pageCount
    if (readPage > pageCount) {
        return errorResponse(h, 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount', 400);
    }

    const id = generateUUID();
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updatedAt,
    };
    books.push(newBook);

    return h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
        bookId: id,
        },
    }).code(201);
};

const updateBook = (request, h) => {
    const { id } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const index = books.findIndex((b) => b.id === id);

    // Book not found
    if (index === -1) {
        return errorResponse(h, 'Gagal memperbarui buku. Id tidak ditemukan', 404);
    }

    // Check if name is missing
    if (!name) {
        return errorResponse(h, 'Gagal memperbarui buku. Mohon isi nama buku', 400);
    }

    // Check if readPage is greater than pageCount
    if (readPage > pageCount) {
        return errorResponse(h, 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount', 400);
    }

    const updatedAt = new Date().toISOString();
    const finished = pageCount === readPage;

    books[index] = {
        ...books[index],
        name, year, author, summary, publisher, pageCount, readPage, reading, finished, updatedAt,
    };

    return h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
    }).code(200);
};

const deleteBook = (request, h) => {
    const { id } = request.params;
    const index = books.findIndex((b) => b.id === id);

    if (index === -1) {
        return errorResponse(h, 'Buku gagal dihapus. Id tidak ditemukan', 404);
    }

    books.splice(index, 1);

    return h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
    }).code(200);
};

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
};
