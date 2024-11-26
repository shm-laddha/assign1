import mongoose from 'mongoose';

export interface IReviewLocation {
  country: string;
  city?: string;
}
export interface IBookReview {
  bookId: string;
  location: IReviewLocation;
  title: string;
  reviewerName?: string;
  content: string;
  rating: number;
  updatedAt: Date;
  createdAt: Date;
}

const bookReviewSchema = new mongoose.Schema<IBookReview>(
  {
    bookId: { type: String, required: true },
    reviewerName: { type: String, required: true },
    location: { type: Object, required: false },
    title: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true }
  },
  { timestamps: true }
);

export const Review = mongoose.model<IBookReview>(
  'BookReview',
  bookReviewSchema
);
