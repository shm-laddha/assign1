import { gql } from "@apollo/client";

export const GET_BOOK_REVIEWS_QUERY = gql`
  query GetBookReviews($bookId: String!, $page: Int, $pageSize: Int) {
    bookReviews(bookId: $bookId, page: $page, pageSize: $pageSize) {
      overallRating
      bookId
      reviews {
        total
        items {
          createdAt
          reviewerName
          title
          rating
          content
        }
      }
    }
  }
`;

export const ADD_BOOK_REVIEW_MUTATION = gql`
  mutation Mutation(
    $bookId: bookId_String_NotNull_format_uuid!
    $title: title_String_NotNull_minLength_10_maxLength_100!
    $rating: rating_Int_NotNull_min_1_max_5!
    $reviewerName: String
    $content: String
  ) {
    addReview(
      bookId: $bookId
      title: $title
      rating: $rating
      reviewerName: $reviewerName
      content: $content
    ) {
      id
    }
  }
`;
