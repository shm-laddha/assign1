import { Review } from 'src/database/mongo';
import {
  BookReview,
  MutationAddReviewArgs,
  PaginatedReviews,
  QueryBookReviewsArgs,
  ReviewItem
} from 'src/graphql/grqphql';
import { createMongoPaginationQuery } from './queryUtils';
import { Book } from 'src/database/sql/models';

export class ReviewService {
  async getAll(
    bookId: string,
    paginationArgs?: { pageSize: number; page: number }
  ): Promise<PaginatedReviews> {
    const aggArgument = [
      {
        $match: {
          bookId
        }
      },
      { $count: 'totalCount' }
    ];
    const result = await Review.aggregate(aggArgument);
    const totalCount = result?.length ? result[0].totalCount : 0;
    const reviews = await Review.find(
      {
        bookId
      },
      undefined,
      createMongoPaginationQuery(
        paginationArgs?.pageSize as number,
        paginationArgs?.page as number
      )
    );
    return {
      items: reviews.map(
        (review) =>
          ({
            id: review.id,
            bookId: review.bookId,
            reviewerName: review.reviewerName ?? 'ANONYMOUS',
            title: review.title,
            content: review.content,
            rating: review.rating,
            country: review.location?.country,
            createdAt: review.createdAt.toISOString(),
            updatedAt: review.updatedAt.toISOString()
          }) as ReviewItem
      ),
      page: paginationArgs?.page || 1,
      pageSize: paginationArgs?.pageSize
        ? totalCount < paginationArgs?.pageSize
          ? totalCount
          : paginationArgs.pageSize
        : totalCount,
      total: totalCount,
      hasNextPage:
        totalCount >
        (paginationArgs?.page || 1) * (paginationArgs?.pageSize ?? 10)
    };
  }

  async create(args: MutationAddReviewArgs): Promise<ReviewItem> {
    const book = await Book.findByPk(args.bookId);
    if (!book) {
      throw new Error(
        `BadRequestExecption: ${args.bookId} is not a valid bookId`
      );
    }

    const review = await Review.create({
      ...args,
      location: args.reviewerLocation
    });
    return {
      ...review,
      id: review.id,
      country: review.location?.country,
      createdAt: review.createdAt.toISOString(),
      updatedAt: review.updatedAt.toISOString()
    };
  }

  async deleteBookReviews(bookId: string): Promise<number> {
    const { deletedCount } = await Review.deleteMany({
      bookId
    });
    return deletedCount;
  }

  async getBookRating(bookId: string): Promise<number> {
    const data = await Review.aggregate([
      {
        $match: {
          bookId
        }
      },
      {
        $group: {
          _id: '$bookId',
          rating: {
            $avg: '$rating'
          }
        }
      }
    ]);

    return data[0]?.rating;
  }
}

export const reviewService = new ReviewService();
