import { PaginatedAuthors, QueryAuthorsArgs } from 'src/graphql/grqphql';
import { AuthorAttributes } from '../database/sql';
import { Author } from '../database/sql/models';
import {
  createDateFilterQuery,
  createFullTextSearchFilterQuery,
  createPaginationQuery
} from './queryUtils';

export class AuthorService {
  async create(attributes: AuthorAttributes): Promise<Author> {
    const [author, isCreated] = await Author.findOrBuild({
      where: { name: attributes.name },
      defaults: attributes
    });
    if (isCreated) {
      await author.save();
    }
    return author;
  }

  async delete(id: string): Promise<string> {
    await Author.destroy({
      where: {
        id
      }
    });
    return id;
  }

  async update(
    id: string,
    authorDetails: Partial<AuthorAttributes>
  ): Promise<Author> {
    const authors = await Author.update(authorDetails, {
      where: {
        id
      },
      returning: true,
      limit: 1
    });

    return authors[1][0];
  }

  async search(args: QueryAuthorsArgs) {
    const authors: Author[] = [];
    let totalCount = 1;
    if (args.authorId) {
      const author = await Author.findByPk(args.authorId);
      if (author) {
        authors.push(author);
      }
    } else {
      const { rows, count } = await Author.findAndCountAll({
        where:
          Object.keys(args).length > 0
            ? {
                ...createFullTextSearchFilterQuery({
                  name: args.name
                }),
                ...createDateFilterQuery({
                  bornDate: {
                    gte: args.fromBornDate,
                    lte: args.toBornDate
                  }
                })
              }
            : undefined,
        ...createPaginationQuery(args.pageSize as number, args.page as number)
      });
      totalCount = count;
      authors.push(...rows);
    }
    return {
      items: authors,
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

  async getById(id: string): Promise<Author | null> {
    if (!id) {
      return null;
    }
    const author = await Author.findByPk(id);
    return author;
  }
}

export const authorService = new AuthorService();
