import { ApolloServerOptions } from '@apollo/server';
import { authorService } from '../services/author';
import { bookService } from '../services/book';
import { AuthorAttributes, BookAttributes } from 'src/database/sql';
import { GqlContext } from './interfaces';
import {
  AuthorBooksArgs,
  BookReview,
  QueryAuthorsArgs,
  QueryBookReviewsArgs,
  QueryBooksArgs
} from './grqphql';
import { reviewService } from 'src/services/review';
const resolvers: ApolloServerOptions<any>['resolvers'] = {
  Mutation: {
    addAuthor: async (_: any, args: AuthorAttributes) =>
      authorService.create(args),
    addBook: async (_: any, args: BookAttributes) => bookService.create(args),
    updateAuthor: async (_: any, args: any) =>
      authorService.update(args.id, args),
    updateBook: async (_: any, args: any) => bookService.update(args.id, args),
    deleteAuthor: async (_: any, args: any) => authorService.delete(args.id),
    deleteBook: async (_: any, args: any) => bookService.delete(args.id),
    addReview: async (_: any, args: any) => reviewService.create(args)
  },
  Query: {
    books: async (_: any, args: QueryBooksArgs) => {
      return bookService.search(args);
    },
    authors: async (_: any, args: QueryAuthorsArgs) => {
      return authorService.search(args);
    },
    bookReviews: async (
      _: any,
      args: QueryBookReviewsArgs
    ): Promise<BookReview> => {
      return {
        bookId: args.bookId,
        overallRating: await reviewService.getBookRating(args.bookId),
        reviews: await reviewService.getAll(args.bookId, {
          pageSize: args.pageSize as number,
          page: args.page as number
        })
      };
    }
  },
  Book: {
    author: async (
      book: { authorId: string },
      _: any,
      contextValue: GqlContext
    ) => {
      if (!book.authorId) return null;
      return await contextValue.loaders.authors.load(book.authorId);
    },
    createdAt: (book: { createdAt: Date }) => book.createdAt.toISOString(),
    updatedAt: (book: { updatedAt: Date }) => book.updatedAt.toISOString()
  },
  Author: {
    books: async (author: { id: string }, args: AuthorBooksArgs) => {
      return await bookService.getByAuthorId(author.id, args);
    },
    createdAt: (book: { createdAt: Date }) => book.createdAt.toISOString(),
    updatedAt: (book: { updatedAt: Date }) => book.updatedAt.toISOString()
  }
};

export { resolvers };
