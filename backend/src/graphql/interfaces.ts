import DataLoader from 'dataloader';
import { Author, Book } from './grqphql';

export interface GqlContext {
  loaders: {
    authors: DataLoader<string, Author | null>;
    books: DataLoader<string, Book | null>;
  };
}
