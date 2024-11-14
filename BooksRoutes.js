const BooksController = require('./BooksController');

const booksRoutes = [
    {
        method: 'GET',
        path: '/books',
        handler: BooksController.getAllBooks,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: BooksController.getBookById,
    },
    {
        method: 'POST',
        path: '/books',
        handler: BooksController.addBook,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: BooksController.updateBook,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: BooksController.deleteBook,
    },
];

module.exports = booksRoutes;
