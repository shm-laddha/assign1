export interface IBookItem {
  id: string;
  publishedDate: string;
  title: string;
  description: string;
  author: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IBookListResponse {
  books: {
    items: Array<IBookItem>;
    total: number;
  };
}

export interface IReviewListProps {
  bookId: string;
}

export interface IReviewItem {
  createdAt: string;
  reviewerName: string;
  title: string;
  rating: number;
  content: string;
}

export interface IBookReviewResponse {
  bookReviews: {
    overallRating: number;
    bookId: string;
    reviews: {
      total: number;
      items: Array<IReviewItem>;
    };
  };
}

export interface IBookCardProps {
  book: IBookItem;
  refetch: () => void;
}
