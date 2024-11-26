import {
  AuthorBooksArgs,
  PaginatedBooks,
  QueryBooksArgs
} from '../graphql/grqphql';
import { AuthorAttributes, BookAttributes } from '../database/sql';
import { Book, Author, BookCreationAttributes } from '../database/sql/models';
import {
  createDateFilterQuery,
  createFullTextSearchFilterQuery,
  createPaginationQuery
} from './queryUtils';
import { reviewService } from './review';

export class BookService {
  async create(
    attributes: BookAttributes,
    authorAttributes?: AuthorAttributes
  ): Promise<Book> {
    const [book, isCreated] = await Book.findOrBuild({
      where: { title: attributes.title },
      defaults: attributes
    });
    if (isCreated) {
      await book.save();
      if (authorAttributes) {
        const [author, isCreated] = await Author.findOrBuild({
          where: { name: authorAttributes.name },
          defaults: authorAttributes
        });
        if (isCreated) {
          await author.save();
          book.set('authorId', author.id);
        }
      }
    }
    return book;
  }

  async delete(id: string): Promise<string> {
    await Book.destroy({
      where: {
        id
      }
    });

    // Also delete corresponding book reviews from mongo
    await reviewService.deleteBookReviews(id);

    return id;
  }

  async update(
    id: string,
    bookDetails: Partial<BookCreationAttributes>
  ): Promise<Book> {
    const books = await Book.update(bookDetails, {
      where: {
        id
      },
      returning: true,
      limit: 1
    });

    return books[1][0];
  }

  async search(args: QueryBooksArgs) {
    const books: Book[] = [];
    let totalCount = 1;
    if (args.bookId) {
      const book = await Book.findByPk(args.bookId);
      if (book) {
        books.push(book);
      }
    } else {
      const { rows, count } = await Book.findAndCountAll({
        where: {
          ...createFullTextSearchFilterQuery({
            title: args.title
          }),
          ...createDateFilterQuery({
            publishedDate: {
              gte: args.fromPublishedDate,
              lte: args.toPublishedDate
            }
          })
        },
        ...createPaginationQuery(args.pageSize as number, args.page as number)
      });
      totalCount = count;
      books.push(...rows);
    }
    return {
      items: books,
      page: args.page || 1,
      pageSize: args.pageSize
        ? totalCount < args.pageSize
          ? totalCount
          : args.pageSize
        : totalCount,
      total: totalCount,
      hasNextPage: totalCount > (args.page || 1) * (args.pageSize ?? 10)
    };
  }

  async getByAuthorId(authorId: string, args: AuthorBooksArgs) {
    const { rows: books, count } = await Book.findAndCountAll({
      where: {
        authorId
      },
      ...createPaginationQuery(args.pageSize as number, args.page as number)
    });
    return {
      items: books,
      page: args.page || 1,
      pageSize: args.pageSize
        ? count < args.pageSize
          ? count
          : args.pageSize
        : count,
      total: count,
      hasNextPage: count > (args.page || 1) * (args.pageSize ?? 10)
    };
  }

  async getById(id: string): Promise<Book | null> {
    if (!id) {
      return null;
    }
    const book = await Book.findByPk(id);
    return book;
  }
}

export const bookService = new BookService();
