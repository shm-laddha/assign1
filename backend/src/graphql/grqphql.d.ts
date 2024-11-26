import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Author = {
  __typename?: 'Author';
  biography: Scalars['String']['output'];
  books?: Maybe<PaginatedBooks>;
  bornDate: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};


export type AuthorBooksArgs = {
  bookId?: InputMaybe<Scalars['String']['input']>;
  fromPublishedDate?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  toPublishedDate?: InputMaybe<Scalars['String']['input']>;
};

export type Book = {
  __typename?: 'Book';
  author?: Maybe<Author>;
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  publishedDate: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type BookReview = {
  __typename?: 'BookReview';
  bookId: Scalars['String']['output'];
  overallRating?: Maybe<Scalars['Float']['output']>;
  reviews?: Maybe<PaginatedReviews>;
};


export type BookReviewReviewsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

export type LocationInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAuthor: Author;
  addBook: Book;
  addReview?: Maybe<ReviewItem>;
  deleteAuthor: Scalars['String']['output'];
  deleteBook: Scalars['String']['output'];
  updateAuthor: Author;
  updateBook: Book;
};


export type MutationAddAuthorArgs = {
  biography?: InputMaybe<Scalars['String']['input']>;
  bornDate?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type MutationAddBookArgs = {
  authorId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  publishedDate?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};


export type MutationAddReviewArgs = {
  bookId: Scalars['String']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
  rating: Scalars['Int']['input'];
  reviewerLocation?: InputMaybe<LocationInput>;
  reviewerName?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};


export type MutationDeleteAuthorArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteBookArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateAuthorArgs = {
  biography?: InputMaybe<Scalars['String']['input']>;
  bornDate?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateBookArgs = {
  authorId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  publishedDate?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PaginatedAuthors = {
  __typename?: 'PaginatedAuthors';
  hasNextPage: Scalars['Boolean']['output'];
  items?: Maybe<Array<Author>>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PaginatedBooks = {
  __typename?: 'PaginatedBooks';
  hasNextPage: Scalars['Boolean']['output'];
  items?: Maybe<Array<Book>>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PaginatedReviews = {
  __typename?: 'PaginatedReviews';
  hasNextPage: Scalars['Boolean']['output'];
  items?: Maybe<Array<ReviewItem>>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  authors?: Maybe<PaginatedAuthors>;
  bookReviews?: Maybe<BookReview>;
  books?: Maybe<PaginatedBooks>;
};


export type QueryAuthorsArgs = {
  authorId?: InputMaybe<Scalars['String']['input']>;
  fromBornDate?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  toBornDate?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBookReviewsArgs = {
  bookId: Scalars['String']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryBooksArgs = {
  bookId?: InputMaybe<Scalars['String']['input']>;
  fromPublishedDate?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  toPublishedDate?: InputMaybe<Scalars['String']['input']>;
};

export type ReviewItem = {
  __typename?: 'ReviewItem';
  bookId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  rating: Scalars['Int']['output'];
  reviewerName?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type ReviewLocation = {
  __typename?: 'ReviewLocation';
  city?: Maybe<Scalars['String']['output']>;
  country: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Author: ResolverTypeWrapper<Author>;
  Book: ResolverTypeWrapper<Book>;
  BookReview: ResolverTypeWrapper<BookReview>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LocationInput: LocationInput;
  Mutation: ResolverTypeWrapper<{}>;
  PaginatedAuthors: ResolverTypeWrapper<PaginatedAuthors>;
  PaginatedBooks: ResolverTypeWrapper<PaginatedBooks>;
  PaginatedReviews: ResolverTypeWrapper<PaginatedReviews>;
  Query: ResolverTypeWrapper<{}>;
  ReviewItem: ResolverTypeWrapper<ReviewItem>;
  ReviewLocation: ResolverTypeWrapper<ReviewLocation>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Author: Author;
  Book: Book;
  BookReview: BookReview;
  Boolean: Scalars['Boolean']['output'];
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  LocationInput: LocationInput;
  Mutation: {};
  PaginatedAuthors: PaginatedAuthors;
  PaginatedBooks: PaginatedBooks;
  PaginatedReviews: PaginatedReviews;
  Query: {};
  ReviewItem: ReviewItem;
  ReviewLocation: ReviewLocation;
  String: Scalars['String']['output'];
};

export type AuthorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = {
  biography?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  books?: Resolver<Maybe<ResolversTypes['PaginatedBooks']>, ParentType, ContextType, Partial<AuthorBooksArgs>>;
  bornDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookResolvers<ContextType = any, ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']> = {
  author?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  publishedDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['BookReview'] = ResolversParentTypes['BookReview']> = {
  bookId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  overallRating?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  reviews?: Resolver<Maybe<ResolversTypes['PaginatedReviews']>, ParentType, ContextType, Partial<BookReviewReviewsArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addAuthor?: Resolver<ResolversTypes['Author'], ParentType, ContextType, RequireFields<MutationAddAuthorArgs, 'name'>>;
  addBook?: Resolver<ResolversTypes['Book'], ParentType, ContextType, RequireFields<MutationAddBookArgs, 'title'>>;
  addReview?: Resolver<Maybe<ResolversTypes['ReviewItem']>, ParentType, ContextType, RequireFields<MutationAddReviewArgs, 'bookId' | 'rating' | 'title'>>;
  deleteAuthor?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationDeleteAuthorArgs, 'id'>>;
  deleteBook?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationDeleteBookArgs, 'id'>>;
  updateAuthor?: Resolver<ResolversTypes['Author'], ParentType, ContextType, RequireFields<MutationUpdateAuthorArgs, 'id'>>;
  updateBook?: Resolver<ResolversTypes['Book'], ParentType, ContextType, RequireFields<MutationUpdateBookArgs, 'id'>>;
};

export type PaginatedAuthorsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedAuthors'] = ResolversParentTypes['PaginatedAuthors']> = {
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<ResolversTypes['Author']>>, ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageSize?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedBooksResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedBooks'] = ResolversParentTypes['PaginatedBooks']> = {
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<ResolversTypes['Book']>>, ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageSize?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedReviewsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedReviews'] = ResolversParentTypes['PaginatedReviews']> = {
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<ResolversTypes['ReviewItem']>>, ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pageSize?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  authors?: Resolver<Maybe<ResolversTypes['PaginatedAuthors']>, ParentType, ContextType, Partial<QueryAuthorsArgs>>;
  bookReviews?: Resolver<Maybe<ResolversTypes['BookReview']>, ParentType, ContextType, RequireFields<QueryBookReviewsArgs, 'bookId'>>;
  books?: Resolver<Maybe<ResolversTypes['PaginatedBooks']>, ParentType, ContextType, Partial<QueryBooksArgs>>;
};

export type ReviewItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReviewItem'] = ResolversParentTypes['ReviewItem']> = {
  bookId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  reviewerName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReviewLocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReviewLocation'] = ResolversParentTypes['ReviewLocation']> = {
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Author?: AuthorResolvers<ContextType>;
  Book?: BookResolvers<ContextType>;
  BookReview?: BookReviewResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaginatedAuthors?: PaginatedAuthorsResolvers<ContextType>;
  PaginatedBooks?: PaginatedBooksResolvers<ContextType>;
  PaginatedReviews?: PaginatedReviewsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ReviewItem?: ReviewItemResolvers<ContextType>;
  ReviewLocation?: ReviewLocationResolvers<ContextType>;
};

